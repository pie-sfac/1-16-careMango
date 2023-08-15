import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import Calendar from '@toast-ui/react-calendar';
// import { CounselingSchedule, PrivateSchedule, SchedulApiData } from '../types/scheduleApi';
import { convertToDisplayData, Schedule } from '@/utils/scheduleUtils';
import { axiosInstance } from '@/utils/apiInstance';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import { ReactComponent as Search } from '@/assets/icons/Search.svg';
import { ReactComponent as Setting } from '@/assets/icons/Setting.svg';
import { ReactComponent as CalendarIcon } from '@/assets/icons/Calendar.svg';
import Modal from '@components/common/Modal/Modal';

function ScheduleCalendar() {
  const [isOpen, setIsOpen] = useState(false);

  const [view, setView] = useState('month');

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setView(event.target.value);
  };

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleConfirm = () => {
    console.log('Modal confirmed');
    handleClose();
  };

  const navigate = useNavigate();

  const goCreateCounseling = () => {
    navigate('/schedules/counseling/new');
  };

  const goCheckSchedule = () => {
    navigate('/schedule/personal/1');
  };

  const goCreateSchedule = () => {
    navigate('/schedule/privateLesson/new');
  };

  const goCheckCounseling = () => {
    navigate('/schedules/counseling/174');
  };

  const [events, setEvents] = useState<Schedule[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/schedules`, {
          params: {
            from: '2023-01-01',
            to: '2024-01-01',
          },
        });
        const convertedData = convertToDisplayData(response.data);
        setEvents(convertedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const calendars = [
    {
      id: 'cal1',
      name: 'Personal',
    },
  ];

  const getDuration = (start: string, end: string): string => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const differenceInMilliseconds = endDate.getTime() - startDate.getTime();
    const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

    const roundedHours = Math.round(differenceInHours);
    return `${roundedHours} 시간`;
  };

  const renderAttendance = (attendance?: string) => {
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

    return <div className={`w-3 h-3 ${bgColor}`} />;
  };

  // 1. 총 일정 수 계산
  const totalEvents = events.length;

  // 2. 취소된 일정 수 계산
  // 여기서는 'attendance' 속성이 '결석'으로 표시된 일정을 취소된 것으로 간주하였습니다.
  const cancelledEvents = events.filter((event) => event.attendance === '결석').length;

  // 3. 취소율 계산
  const cancellationRate = ((cancelledEvents / totalEvents) * 100).toFixed(2); // 소수점 둘째 자리까지 표시

  return (
    <div className="flex flex-col justify-between">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <span className="text-lg font-semibold">2023년 8월</span>
          <button type="button" className="text-black focus:outline-none">
            <CalendarIcon />
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
          <span className="font-bold">{totalEvents}건</span>
          <span>취소 일정 : </span>
          <span className="font-bold text-red-600">{cancelledEvents}건</span>
          <span>취소율 : </span>
          <span className="font-bold text-red-600">{cancellationRate}%</span>
        </div>
        <div className="flex items-center gap-4">
          <button type="button" className="focus:outline-none">
            <Search />
          </button>
          <button type="button" className="focus:outline-none">
            <Setting />
          </button>
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={handleOpen}>
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
              <li className="inline-block text-sm">총 일정 : {totalEvents}건</li>
              <li className="inline-block text-sm">취소 일정 : {cancelledEvents}건</li>
              <li className="inline-block text-sm">취소율 : {cancellationRate}%</li>
            </ul>
          </div>
          <div className="flex justify-around">
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500" /> 출석
            </span>
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-500" /> 결석
            </span>
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-500" /> 예약
            </span>
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 bg-transparent border border-green-500" /> 상담
            </span>
          </div>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="text-xs">출결</th>
                <th className="text-xs">진행시간</th>
                <th className="text-xs">내용</th>
                <th className="text-xs">잔여횟수</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td className="px-4 py-2 text-xs border">{renderAttendance(event.attendance)}</td>
                  <td className="px-4 py-2 text-xs border">{getDuration(event.start, event.end)}</td>
                  <td className="px-4 py-2 text-xs border">{event.title}</td>
                  <td className="px-4 py-2 text-xs border">{event.remainingTimes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </aside>
      </main>
      <Modal
        isOpen={isOpen}
        content={
          <div className="flex items-center h-64">
            <button
              type="button"
              onClick={goCreateSchedule}
              className="w-64 h-32 px-3 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600">
              개인 수업 일정 생성
            </button>
            <button
              type="button"
              onClick={goCheckSchedule}
              className="w-64 h-32 px-3 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600">
              개인 수업 일정 조회(mock 데이터)
            </button>
            <button
              type="button"
              onClick={goCreateCounseling}
              className="w-64 h-32 px-3 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600">
              상담 일정 생성
            </button>
            <button
              type="button"
              onClick={goCheckCounseling}
              className="w-64 h-32 px-3 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
              상담 일정 조회
            </button>
          </div>
        }
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </div>
  );
}

export default ScheduleCalendar;
