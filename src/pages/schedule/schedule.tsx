import { ChangeEvent, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query'; // 추가
import { useRecoilState } from 'recoil'; // 추가
import { timeListState } from '@/atoms/counseling/counselingScheduleAtom'; // 추가

import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import { convertToDisplayData, Schedule } from '@/utils/scheduleUtils';
import { axiosInstance } from '@/utils/apiInstance';
import Modal from '@components/common/Modal/Modal';

import { SchedulApiData } from '@/types/scheduleApi';
import { CounselingDetail } from '@/types/counseling/counselingDetail';

import { ReactComponent as Excercise } from '@/assets/icons/Exercise.svg';
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

  const fetchSchedules = async (): Promise<SchedulApiData> => {
    const from = '2023-01-21';
    const to = '2023-12-31';
    let apiUrl = `schedules?from=${from}&to=${to}`;

    const res = await axiosInstance.get(apiUrl);
    return {
      ...res.data,
      counselingSchedules: res.data.counselingSchedules.filter((item: CounselingDetail) => !item.isCanceled),
    };
  };

  const { data: scheduleList } = useQuery('schedules', fetchSchedules);

  const [timeList, setTimeList] = useRecoilState(timeListState);

  const goCreateCounseling = () => {
    const timeListData = scheduleList?.counselingSchedules?.map((e) => [e.startAt, e.endAt]) || [];
    setTimeList(timeListData);
    navigate('counseling/new');
  };

  // const goCheckSchedule = () => {
  //   navigate('/schedule/personal/1');
  // };

  const goCreateSchedule = () => {
    navigate('/schedule/privateLesson/new');
  };

  // const goCheckCounseling = () => {
  //   navigate('/schedules/counseling/174');
  // };

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
        <div className="w-full h-full overflow-hidden rounded-xl">
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
            isReadOnly={true}
          />
        </div>
        <aside className="box-content p-4 bg-white rounded-lg w-96">
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
          <div>
            <div className="m-3">
              <p className="font-bold">일정 생성</p>
              <p className="mt-2 mb-5 text-sm">일정을 생성해주세요.</p>
            </div>
            <div className="flex gap-5 m-3 h-60 justify-evenly">
              <button
                type="button"
                onClick={goCreateSchedule}
                className="flex flex-col justify-start w-full px-8 py-10 border-2 shadow text-start rounded-2xl">
                <div className="relative w-full h-full">
                  <p className="font-bold">개인 수업</p>
                  <p className="text-sm">일정 생성</p>
                  <Excercise className="absolute bottom-0 right-0" />
                </div>
              </button>
              <button
                type="button"
                onClick={goCreateCounseling}
                className="flex flex-col justify-start w-full px-8 py-10 border-2 shadow text-start rounded-2xl">
                <div className="relative w-full h-full">
                  <p className="font-bold">상담</p>
                  <p className="text-sm">일정 생성</p>
                  <Excercise className="absolute bottom-0 right-0" />
                </div>
              </button>
            </div>
          </div>
        }
        onClose={handleClose}
        onConfirm={handleConfirm}
        width={'w-1/2'}
        pageContext="schedule"
      />
    </div>
  );
}

export default ScheduleCalendar;
