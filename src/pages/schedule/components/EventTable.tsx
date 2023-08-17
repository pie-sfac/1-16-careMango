import { Schedule } from '@/utils/scheduleUtils';

interface EventTableProps {
  events: Schedule[];
  renderAttendance: (attendance?: string) => JSX.Element;
  getDuration: (start: string, end: string) => string;
  currentDate: Date; // 이 줄 추가
}

function EventTable({ events, renderAttendance, getDuration, currentDate }: EventTableProps) {
  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.start);
    return (
      eventDate.getDate() === currentDate.getDate() &&
      eventDate.getMonth() === currentDate.getMonth() &&
      eventDate.getFullYear() === currentDate.getFullYear()
    );
  });

  return (
    <div className="h-[50vh] overflow-y-auto">
      <table className=" w-full">
        <thead>
          <tr>
            <th className="text-xs">출결</th>
            <th className="text-xs">진행시간</th>
            <th className="text-xs">내용</th>
            <th className="text-xs">잔여횟수</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.map((event) => (
            <tr key={event.id}>
              <td className="px-4 py-2 text-xs border">{renderAttendance(event.attendance)}</td>
              <td className="px-4 py-2 text-xs border">{getDuration(event.start, event.end)}</td>
              <td className="px-4 py-2 text-xs border">{event.title}</td>
              <td className="px-4 py-2 text-xs border">{event.remainingTimes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EventTable;
