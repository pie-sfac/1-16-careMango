import { useState } from 'react';
import { axiosInstance } from '@/utils/apiInstance';
import { useQuery } from 'react-query';
import { TicketsData } from '@/types/tickets/tickets';
import { LessonTypeEnum, TermUnitEnum } from '@/enums/Ticket';
import { ReactComponent as Ticket } from '@/assets/icons/Ticket.svg';
import { ReactComponent as MoreVert } from '@/assets/icons/MoreVert.svg';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '@components/common/Card/Card';
import SubHeader from '@components/common/SubHeader/SubHeader';
import DetailDropDown from '../components/DetailDropdown';

const TicketDetailPage = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    data: ticket,
    isLoading,
    isError,
  } = useQuery<TicketsData>(['ticket', ticketId], async () => {
    const res = await axiosInstance.get(`/tickets/${ticketId}`);
    return res.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error</span>;
  }

  const goIssuedList = () => {
    navigate(`/tickets/${ticketId}/issued-tickets`);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <SubHeader
        title="수강권 상세"
        rightBtn={
          <span onClick={toggleDropdown} className="relative cursor-pointer">
            <MoreVert />
            {ticket && <DetailDropDown isOpen={isOpen} setIsOpen={setIsOpen} isActive={ticket.isActive} />}
          </span>
        }
      />
      {ticket && (
        <main>
          <div className="flex items-center gap-2 mb-6">
            <h1 className="main-title">{ticket.title}</h1>
            <span className="p-1 text-sm rounded text-primary-500 bg-bgc-50">{LessonTypeEnum[ticket.lessonType]}</span>
          </div>
          <div className="flex items-center justify-between px-1 py-2">
            <h2 className="small-title">수강권 내용</h2>
            <span className="text-sm cursor-pointer text-primary-500" onClick={goIssuedList}>
              수강권 부여내역 ▸
            </span>
          </div>

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
                  {ticket.isActive ? (
                    <span className="text-primary-500">판매중</span>
                  ) : (
                    <span className="text-erro">판매 종료</span>
                  )}
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
