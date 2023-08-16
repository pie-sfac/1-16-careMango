import React, { ChangeEvent } from 'react';
import { ReactComponent as Search } from '@/assets/icons/Search.svg';
import { ReactComponent as Setting } from '@/assets/icons/Setting.svg';
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

const SubHeader: React.FC<Props> = ({
  currentDate,
  onDateChange,
  view,
  onViewChange,
  totalEvents,
  cancelledEvents,
  onOpenModal,
}) => {
  const cancellationRate = ((cancelledEvents / totalEvents) * 100).toFixed(2); // 소수점 둘째 자리까지 표시

  const formatDateForUsage = (date: Date): string => {
    const yyyy = date.getFullYear().toString();
    const mm = (date.getMonth() + 1).toString().padStart(2, '0');
    const dd = date.getDate().toString().padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-4">
        <input
          type="date"
          value={formatDateForUsage(currentDate)} // YYYY-MM-DD 형식
          onChange={onDateChange}
          className="text-lg font-semibold focus:outline-none rounded-sm"
        />
      </div>
      <div>
        <select name="selectManager" id="manager" className="p-1 border rounded">
          <option value="">관리자명</option>
        </select>
      </div>
      <div>
        <select name="selectView" id="calendarView" className="p-1 border rounded" onChange={onViewChange} value={view}>
          <option value="month">월</option>
          <option value="week">주</option>
          <option value="day">일</option>
        </select>
      </div>

      <Statistics totalEvents={totalEvents} cancelledEvents={cancelledEvents} />

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
        onClick={onOpenModal}>
        + 일정생성
      </button>
    </div>
  );
};

export default SubHeader;
