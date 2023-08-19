import { ChangeEvent, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import { convertToDisplayData, Schedule } from '@/utils/scheduleUtils';
import { axiosInstance } from '@/utils/apiInstance';
import Modal from '@components/common/Modal/Modal';

import ScheduleHeader from './components/ScheduleHeader';
import Legend from './components/Legend';
import EventTable from './components/EventTable';

function ScheduleCalendar() {
  const calendarRef = useRef<any>(null);

  const [currentDate, setCurrentDate] = useState(new Date());

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    setCurrentDate(selectedDate);
  };

  function formatDateForUsage(date: Date): string {
    const yyyy = date.getFullYear().toString();
    const mm = (date.getMonth() + 1).toString().padStart(2, '0');
    const dd = date.getDate().toString().padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  const getFormattedDate = (date: Date): string => {
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const dayName = dayNames[date.getDay()];
    const dd = date.getDate().toString().padStart(2, '0');
    const mm = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${mm}.${dd}(${dayName})`;
  };

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
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        const response = await axiosInstance.get(`/schedules`, {
          params: {
            from: formatDateForUsage(firstDayOfMonth),
            to: formatDateForUsage(lastDayOfMonth),
          },
        });
        const convertedData = convertToDisplayData(response.data);
        setEvents(convertedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentDate]);

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.getInstance().setDate(currentDate);
    }
  }, [currentDate]);

  const calendars = [{}];

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

  const totalEvents = events.length;

  const cancelledEvents = events.filter((event) => event.isCanceled === true).length;

  const cancellationRate = ((cancelledEvents / totalEvents) * 100).toFixed(2);

  const myTheme = {
    common: {
      backgroundColor: 'white',
    },
    week: {
      today: {
        color: 'blue',
      },
    },
    month: {},
  };

  return (
    <div className="flex flex-col justify-between">
      <ScheduleHeader
        currentDate={currentDate}
        onDateChange={handleDateChange}
        view={view}
        onViewChange={handleChange}
        totalEvents={totalEvents}
        cancelledEvents={cancelledEvents}
        onOpenModal={handleOpen}
      />
      <main className="flex gap-3">
        <div className="rounded-xl overflow-hidden w-full h-full">
          <Calendar
            height="40rem"
            view={view}
            month={{
              dayNames: ['일', '월', '화', '수', '목', '금', '토'],
              visibleWeeksCount: 5,
              isAlways6Weeks: false,
              visibleEventCount: 3,
            }}
            week={{
              dayNames: ['일', '월', '화', '수', '목', '금', '토'],
              eventView: true,
              taskView: true,
              collapseDuplicateEvents: true,
            }}
            calendars={calendars}
            events={events}
            ref={calendarRef}
            theme={myTheme}
            // gridSelection={true}
            // isReadOnly={false}
          />
        </div>
        <aside className="w-96 p-4 bg-white rounded-lg box-content">
          <div className="h-full">
            <div className="mb-4">
              <p className="mb-2 text-lg font-semibold">{getFormattedDate(currentDate)}</p>

              <ul className="flex space-x-4">
                <li className="inline-block text-xs">총 일정 : {totalEvents}건</li>
                <li className="inline-block text-xs">취소 일정 : {cancelledEvents}건</li>
                <li className="inline-block text-xs">취소율 : {cancellationRate}%</li>
              </ul>
            </div>

            <Legend />

            <EventTable
              events={events}
              renderAttendance={renderAttendance}
              getDuration={getDuration}
              currentDate={currentDate}
            />
          </div>
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
