import Card from '@components/common/Card/Card';
import SubHeader from '@components/common/SubHeader/SubHeader';
import { TicketsData } from '@/types/tickets/tickets';
import { LessonTypeEnum, TermUnitEnum } from '@/enums/Ticket';
import { ReactComponent as Ticket } from '@/assets/icons/Ticket.svg';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '@/utils/apiInstance';

const TicketDetailPage = () => {
  const [ticket, setTicket] = useState<TicketsData>();
  const { ticketId } = useParams();

  const getTicket = useCallback(async () => {
    const res = await axiosInstance.get(`/tickets/${ticketId}`);
    setTicket(res.data);
    console.log(res.data);
  }, [ticketId]);

  useEffect(() => {
    getTicket();
  }, [getTicket]);

  return (
    <>
      <SubHeader title="수강권 상세" />
      {ticket && (
        <main>
          <div className="flex items-center gap-2 mb-6">
            <h1 className="main-title">{ticket.title}</h1>
            <span className="p-1 text-sm rounded text-primary-500 bg-bgc-50">{LessonTypeEnum[ticket.lessonType]}</span>
          </div>
          <h2 className="small-title">수강권 내용</h2>
          <Card>
            <article className="flex items-end justify-between px-4 py-6">
              <ul>
                <li>
                  <span className="inline-block mb-2 w-36 text-text-400">시간</span>{' '}
                  {ticket.bookableLessons[0].duration}분
                </li>
                <li>
                  <span className="inline-block mb-2 w-36 text-text-400">기본 횟수</span> {ticket.defaultCount}회
                </li>
                <li>
                  <span className="inline-block mb-2 w-36 text-text-400">수강권 기간</span> {ticket.defaultTerm}
                  {TermUnitEnum[ticket.defaultTermUnit]}
                </li>
                <li>
                  <span className="inline-block mb-2 w-36 text-text-400">수강권 상태</span>{' '}
                  {ticket.isActive ? '판매중' : '판매 종료'}
                </li>
              </ul>
              <Ticket />
            </article>
          </Card>
        </main>
      )}
    </>
  );
};
export default TicketDetailPage;
