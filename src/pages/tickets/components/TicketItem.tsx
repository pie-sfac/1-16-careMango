import { useLocation, useNavigate } from 'react-router-dom';
import Card from '@components/common/Card/Card';
import { TicketsData } from '@/types/tickets/tickets';
import { LessonTypeEnum, TermUnitEnum } from '@/enums/Ticket';
import { ReactComponent as Ticket } from '@/assets/icons/Ticket.svg';

const TicketItem = ({ ticket }: { ticket: TicketsData }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const goTicketDetail = (ticketId: number) => {
    if (pathname.includes('issue')) {
      navigate(`/tickets/${ticketId}/issue`); // 회원에게 수강권 부여
    }
    if (pathname.includes('center')) {
      navigate(`/tickets/${ticketId}/center`); // 센터 수강권 상세
    }
  };

  return (
    <Card>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
      <article className="w-[30rem] p-6 cursor-pointer" onClick={() => goTicketDetail(ticket.id)}>
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="my-2 font-bold">{ticket.title}</p>
            <p>
              <span className="inline-block w-20 text-text-400">부여</span> {ticket.issuedTicketCount}건
            </p>
          </div>
          <span className="text-sm text-primary-500">{LessonTypeEnum[ticket.lessonType]}</span>
        </div>

        <div className="flex items-end justify-between">
          <ul>
            <li>
              <span className="inline-block w-20 text-text-400">수강권 횟수</span> {ticket.defaultCount}회
            </li>
            <li>
              <span className="inline-block w-20 text-text-400">수업 시간</span> {ticket.bookableLessons[0].duration}분
            </li>
            <li>
              <span className="inline-block w-20 text-text-400">수강권 기간</span> {ticket.defaultTerm}
              {TermUnitEnum[ticket.defaultTermUnit]}
            </li>
          </ul>
          <Ticket />
        </div>
      </article>
    </Card>
  );
};
export default TicketItem;
