import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Calendar from '@toast-ui/react-calendar';
import { CounselingSchedule, PrivateSchedule } from '../types/scheduleApi';

import '@toast-ui/calendar/dist/toastui-calendar.min.css';

interface Schedule {
  id: string;
  calendarId: string;
  title: string;
  category: string;
  start: string;
  end: string;
  isAllDay: boolean;
}

function ScheduleCalendar() {
  const [view, setView] = useState('month');
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setView(event.target.value);
  };

  const [events, setEvents] = useState<Schedule[]>([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/schedules`, {
        params: {
          from: '2023-01-01',
          to: '2024-01-01',
        },
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((response) => {
        // For counselingSchedules
        const counselingSchedules = response.data.counselingSchedules.map((schedule: CounselingSchedule) => ({
          id: String(schedule.id),
          calendarId: '1',
          title: schedule.memo,
          category: 'time',
          start: schedule.startAt,
          end: schedule.endAt,
          isAllDay: false,
          createdAt: schedule.createdAt,
          updatedAt: schedule.updatedAt,
        }));

        // For privateSchedules
        const privateSchedulesEvents = response.data.privateSchedules.map((schedule: PrivateSchedule) => ({
          id: String(schedule.id),
          calendarId: '2', // Assuming it's a different calendar ID
          title: `${schedule.tutor.name} - ${schedule.memo}`, // Combining tutor name and memo for title
          category: 'time',
          start: schedule.startAt,
          end: schedule.endAt,
          isAllDay: false,
          createdAt: schedule.createdAt,
          updatedAt: schedule.updatedAt,
        }));

        // Merge and set the events
        setEvents([...counselingSchedules, ...privateSchedulesEvents]);
      });
  }, []);

  const calendars = [
    {
      id: 'cal1',
      name: 'Personal',
    },
  ];
  const data = [
    { id: 1, attendance: '출석', duration: '1 hour', memberName: 'John Doe (20)', remainingTimes: '3' },
    { id: 2, attendance: '결석', duration: '2 hours', memberName: 'Jane Doe (15)', remainingTimes: '5' },
    { id: 3, attendance: '예약', duration: '2 hours', memberName: 'Jane Doe (30)', remainingTimes: '8' },
    { id: 4, attendance: '상담', duration: '2 hours', memberName: 'Jane Doe (18)', remainingTimes: '1' },
  ];

  const renderAttendance = (attendance: string) => {
    let bgColor;

    switch (attendance) {
      case '출석':
        bgColor = 'bg-blue-500';
        break;
      case '결석':
        bgColor = 'bg-red-500';
        break;
      case '예약':
        bgColor = 'bg-gray-500';
        break;
      case '상담':
        bgColor = 'border border-green-500 bg-transparent';
        break;
      default:
        bgColor = 'bg-white';
        break;
    }

    return <div className={` w-3 h-3 ${bgColor}`} />;
  };

  return (
    <div className="flex flex-col justify-between">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <span className="text-lg font-semibold">2023년 8월</span>
          <button type="button" className="text-black focus:outline-none">
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.6 1.45455H11.9V0H10.5V1.45455H3.5V0H2.1V1.45455H1.4C0.63 1.45455 0 2.10909 0 2.90909V14.5455C0 15.3455 0.63 16 1.4 16H12.6C13.37 16 14 15.3455 14 14.5455V2.90909C14 2.10909 13.37 1.45455 12.6 1.45455ZM12.6 14.5455H1.4V6.54545H12.6V14.5455ZM12.6 5.09091H1.4V2.90909H12.6V5.09091Z"
                fill="#1D1D1D"
              />
            </svg>
          </button>
        </div>
        <div>
          <select name="selectManager" id="manager" className="p-1 border rounded">
            <option value="">관리자명</option>
          </select>
        </div>
        <div>
          <select name="selectView" id="calendarView" className="p-1 border rounded" onChange={handleChange}>
            <option value="month">월</option>
            <option value="week">주</option>
            <option value="day">일</option>
          </select>
        </div>
        <div className="flex items-center gap-3">
          <span>이번 달 : </span>
          <span className="font-bold">박사장</span>
          <span>총 일정 : </span>
          <span className="font-bold">100건</span>
          <span>취소 일정 : </span>
          <span className="font-bold text-red-600">100건</span>
          <span>취소율 : </span>
          <span className="font-bold text-red-600">100%</span>
        </div>
        <div className="flex items-center gap-4">
          <button type="button" className="focus:outline-none">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.47653 10.8907C8.49572 11.5892 7.29583 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6C12 7.29583 11.5892 8.49572 10.8907 9.47653L16.7071 15.2929C17.0976 15.6834 17.0976 16.3166 16.7071 16.7071C16.3166 17.0976 15.6834 17.0976 15.2929 16.7071L9.47653 10.8907ZM10.5 6C10.5 3.51472 8.48528 1.5 6 1.5C3.51472 1.5 1.5 3.51472 1.5 6C1.5 8.48528 3.51472 10.5 6 10.5C8.48528 10.5 10.5 8.48528 10.5 6Z"
                fill="#505050"
              />
            </svg>
          </button>
          <button type="button" className="focus:outline-none">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17.4301 10.98C17.4701 10.66 17.5001 10.34 17.5001 10C17.5001 9.66 17.4701 9.34 17.4301 9.02L19.5401 7.37C19.7301 7.22 19.7801 6.95 19.6601 6.73L17.6601 3.27C17.5701 3.11 17.4001 3.02 17.2201 3.02C17.1601 3.02 17.1001 3.03 17.0501 3.05L14.5601 4.05C14.0401 3.65 13.4801 3.32 12.8701 3.07L12.4901 0.42C12.4601 0.18 12.2501 0 12.0001 0H8.00008C7.75008 0 7.54008 0.18 7.51008 0.42L7.13008 3.07C6.52008 3.32 5.96008 3.66 5.44008 4.05L2.95008 3.05C2.89008 3.03 2.83008 3.02 2.77008 3.02C2.60008 3.02 2.43008 3.11 2.34008 3.27L0.340084 6.73C0.210084 6.95 0.270084 7.22 0.460084 7.37L2.57008 9.02C2.53008 9.34 2.50008 9.67 2.50008 10C2.50008 10.33 2.53008 10.66 2.57008 10.98L0.460084 12.63C0.270084 12.78 0.220084 13.05 0.340084 13.27L2.34008 16.73C2.43008 16.89 2.60008 16.98 2.78008 16.98C2.84008 16.98 2.90008 16.97 2.95008 16.95L5.44008 15.95C5.96008 16.35 6.52008 16.68 7.13008 16.93L7.51008 19.58C7.54008 19.82 7.75008 20 8.00008 20H12.0001C12.2501 20 12.4601 19.82 12.4901 19.58L12.8701 16.93C13.4801 16.68 14.0401 16.34 14.5601 15.95L17.0501 16.95C17.1101 16.97 17.1701 16.98 17.2301 16.98C17.4001 16.98 17.5701 16.89 17.6601 16.73L19.6601 13.27C19.7801 13.05 19.7301 12.78 19.5401 12.63L17.4301 10.98ZM15.4501 9.27C15.4901 9.58 15.5001 9.79 15.5001 10C15.5001 10.21 15.4801 10.43 15.4501 10.73L15.3101 11.86L16.2001 12.56L17.2801 13.4L16.5801 14.61L15.3101 14.1L14.2701 13.68L13.3701 14.36C12.9401 14.68 12.5301 14.92 12.1201 15.09L11.0601 15.52L10.9001 16.65L10.7001 18H9.30008L8.95008 15.52L7.89008 15.09C7.46008 14.91 7.06008 14.68 6.66008 14.38L5.75008 13.68L4.69008 14.11L3.42008 14.62L2.72008 13.41L3.80008 12.57L4.69008 11.87L4.55008 10.74C4.52008 10.43 4.50008 10.2 4.50008 10C4.50008 9.8 4.52008 9.57 4.55008 9.27L4.69008 8.14L3.80008 7.44L2.72008 6.6L3.42008 5.39L4.69008 5.9L5.73008 6.32L6.63008 5.64C7.06008 5.32 7.47008 5.08 7.88008 4.91L8.94008 4.48L9.10008 3.35L9.30008 2H10.6901L11.0401 4.48L12.1001 4.91C12.5301 5.09 12.9301 5.32 13.3301 5.62L14.2401 6.32L15.3001 5.89L16.5701 5.38L17.2701 6.59L16.2001 7.44L15.3101 8.14L15.4501 9.27ZM10.0001 6C7.79008 6 6.00008 7.79 6.00008 10C6.00008 12.21 7.79008 14 10.0001 14C12.2101 14 14.0001 12.21 14.0001 10C14.0001 7.79 12.2101 6 10.0001 6ZM10.0001 12C8.90008 12 8.00008 11.1 8.00008 10C8.00008 8.9 8.90008 8 10.0001 8C11.1001 8 12.0001 8.9 12.0001 10C12.0001 11.1 11.1001 12 10.0001 12Z"
                fill="#1D1D1D"
              />
            </svg>
          </button>
        </div>
        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700">
          + 일정생성
        </button>
      </div>
      <main className="flex flex-1">
        <div className="flex-1 p-4">
          <Calendar
            height="500px"
            view={view}
            month={{
              dayNames: ['일', '월', '화', '수', '목', '금', '토'],
              visibleWeeksCount: 5,
            }}
            week={{
              dayNames: ['일', '월', '화', '수', '목', '금', '토'],
              eventView: true,
              taskView: true,
              // eventView: true,
              collapseDuplicateEvents: true,
            }}
            calendars={calendars}
            events={events}
          />
        </div>
        <aside className="w-64 p-4 bg-gray-100 border-l">
          <div className="mb-4">
            <p className="mb-2 text-lg font-semibold">02.01(수)</p>
            <ul className="flex mb-2 space-x-4">
              <li className="inline-block text-sm">총 일정 : 100건</li>
              <li className="inline-block text-sm">취소 일정 : 100건</li>
              <li className="inline-block text-sm">취소율 : 100%</li>
            </ul>
          </div>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="text-xs">출결</th>
                <th className="text-xs">진행시간</th>
                <th className="text-xs">회원명 (총인원)</th>
                <th className="text-xs">잔여횟수</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-2 text-xs border">{renderAttendance(item.attendance)}</td>
                  <td className="px-4 py-2 text-xs border">{item.duration}</td>
                  <td className="px-4 py-2 text-xs border">{item.memberName}</td>
                  <td className="px-4 py-2 text-xs border">{item.remainingTimes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </aside>
      </main>
    </div>
  );
}

export default ScheduleCalendar;
