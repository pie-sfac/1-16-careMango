import React, { ChangeEvent } from 'react';
import Statistics from './Statistics';

type Props = {
  currentDate: Date;
  onDateChange: (e: ChangeEvent<HTMLInputElement>) => void;
  view: string;
  onViewChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  totalEvents: number;
  cancelledEvents: number;
  onOpenModal: () => void;
};

const ScheduleHeader: React.FC<Props> = ({
  currentDate,
  onDateChange,
  view,
  onViewChange,
  totalEvents,
  cancelledEvents,
  onOpenModal,
}) => {
  const formatDateForUsage = (date: Date): string => {
    const yyyy = date.getFullYear().toString();
    const mm = (date.getMonth() + 1).toString().padStart(2, '0');
    const dd = date.getDate().toString().padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <div className="flex items-center justify-between p-4">
      <div>
        <input
          type="date"
          value={formatDateForUsage(currentDate)} // YYYY-MM-DD 형식
          onChange={onDateChange}
          className="text-lg font-semibold focus:outline-none rounded-sm"
        />
      </div>
      {/* <div>
        <select name="selectManager" id="manager" className="p-1 border rounded">
          <option value="">관리자명</option>
        </select>
      </div> */}
      <div>
        <select
          name="selectView"
          id="calendarView"
          className="p-1 border rounded w-40"
          onChange={onViewChange}
          value={view}>
          <option value="month">월</option>
          <option value="week">주</option>
          <option value="day">일</option>
        </select>
      </div>

      <Statistics totalEvents={totalEvents} cancelledEvents={cancelledEvents} />

      {/* <div className="flex items-center">
        <button type="button" className="focus:outline-none">
          <Search />
        </button>
        <button type="button" className="focus:outline-none">
          <Setting />
        </button>
      </div> */}
      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
        onClick={onOpenModal}>
        + 일정생성
      </button>
    </div>
  );
};

export default ScheduleHeader;
