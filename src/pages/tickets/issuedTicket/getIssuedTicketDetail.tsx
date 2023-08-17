import Card from '@components/common/Card/Card';
import SubHeader from '@components/common/SubHeader/SubHeader';
import { IssuedTicketData } from '@/types/tickets/tickets';
import { LessonTypeEnum, TermUnitEnum } from '@/enums/Ticket';
import { ReactComponent as Ticket } from '@/assets/icons/Ticket.svg';
import { getDay } from '@/utils/date';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '@/utils/apiInstance';

const IssuedTicketDetail = () => {
  const [ticket, setTicket] = useState<IssuedTicketData>();
  const { ticketId } = useParams();

  const getIssuedTicket = useCallback(async () => {
    const res = await axiosInstance.get(`/issued-tickets/${ticketId}`);
    setTicket(res.data);
    console.log(res.data);
  }, [ticketId]);

  useEffect(() => {
    getIssuedTicket();
  }, [getIssuedTicket]);

  return (
    <>
      <SubHeader title="수강권 상세" />
      {ticket && (
        <main>
          <div className="flex items-center gap-2 mb-6">
            <h1 className="main-title">{ticket.title}</h1>
            <span className="p-1 text-sm rounded text-primary-500 bg-bgc-50">{LessonTypeEnum[ticket.lessonType]}</span>
          </div>
          <h2 className="small-title">수강권 정보</h2>
          <Card>
            <article className="flex items-end justify-between px-4 py-6">
              <ul>
                <li>
                  <span className="inline-block mb-2 w-36 text-text-400">기본 횟수</span> {ticket.defaultCount}회
                </li>
                <li>
                  <span className="inline-block mb-2 w-36 text-text-400">서비스 횟수</span> {ticket.serviceCount}회
                </li>
                <li>
                  <span className="inline-block mb-2 w-36 text-text-400">잔여 횟수</span> {ticket.remainingCount}회
                </li>
                <li>
                  <span className="inline-block mb-2 w-36 text-text-400">예약 가능 잔여 횟수</span>{' '}
                  {ticket.availableReservationCount}회
                </li>
                <li>
                  <span className="inline-block mb-2 w-36 text-text-400">수강권 기간</span> {ticket.defaultTerm}
                  {TermUnitEnum[ticket.defaultTermUnit]}
                </li>
                <li>
                  <span className="inline-block mb-2 w-36 text-text-400">유효 기간</span> {getDay(ticket.startAt)} ~{' '}
                  {getDay(ticket.endAt)}
                </li>
                <li>
                  <span className="inline-block mb-2 w-36 text-text-400">담당 강사</span> {ticket.privateTutor.name}
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
export default IssuedTicketDetail;
