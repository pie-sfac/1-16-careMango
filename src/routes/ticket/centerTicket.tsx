import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';
import axiosInstance from '../../utils/apiInstance';

interface BookableLessons {
  id: number;
  type: 'SINGLE' | 'DUET' | 'TRIPLE' | 'GROUP';
  title: string;
  duration: number;
  maxGroupMember: number;
}

interface TicketsData {
  id: number;
  title: string;
  lessonType: 'SINGLE' | 'DUET' | 'TRIPLE' | 'GROUP';
  defaultCount: number;
  defaultTerm: number;
  defaultTermUnit: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
  isActive: boolean;
  maxServiceCount: number;
  issuedTicketCount: number;
  bookableLessons: BookableLessons[];
}

// test data
const ticketsData: TicketsData[] = [
  {
    id: 0,
    title: 'string',
    lessonType: 'SINGLE',
    defaultCount: 5,
    defaultTerm: 10,
    defaultTermUnit: 'DAY',
    isActive: true,
    maxServiceCount: 0,
    issuedTicketCount: 1,
    bookableLessons: [
      {
        id: 0,
        type: 'SINGLE',
        title: 'string',
        duration: 60,
        maxGroupMember: 1,
      },
    ],
  },
  {
    id: 1,
    title: '수강권2',
    lessonType: 'SINGLE',
    defaultCount: 30,
    defaultTerm: 6,
    defaultTermUnit: 'MONTH',
    isActive: true,
    maxServiceCount: 1,
    issuedTicketCount: 3,
    bookableLessons: [
      {
        id: 1,
        type: 'SINGLE',
        title: 'string',
        duration: 30,
        maxGroupMember: 1,
      },
    ],
  },
];

const CenterTicket = () => {
  const [ticketList, setTicketList] = useState<TicketsData[] | null>(null);
  const navigate = useNavigate();

  const getTickets = async () => {
    const res = await axiosInstance.get('tickets');
    setTicketList(res.data.tickets);
    return ticketList;
  };

  const onClickAdd = () => {
    navigate(`/tickets/centerTicket/new`);
  };

  const type = {
    SINGLE: '1:1 개인수업',
    DUET: '2:1 수업',
    TRIPLE: '3:1 수업',
    GROUP: '그룹 수업',
  };

  const termUnit = {
    DAY: '일',
    WEEK: '주',
    MONTH: '개월',
    YEAR: '년',
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setTicketList(ticketsData);
    }, 500);
    return () => clearTimeout(timer);
    // getTickets();
  }, []);

  return (
    <>
      <Header title="수강권" />
      <section className="flex items-center justify-between mt-4">
        <h1 className="main-title">센터 수강권</h1>
        <button type="button" onClick={onClickAdd} className="px-8 py-3 text-white rounded bg-primary-500">
          + 수강권 추가
        </button>
      </section>
      <section className="flex flex-wrap items-center w-full gap-16 mt-20">
        {ticketList &&
          ticketList.map((ticket) => (
            <Card key={ticket.id}>
              <article className="w-[30rem] p-6">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <p className="my-2 font-bold">{ticket.title}</p>
                    <p>
                      <span className="inline-block w-20 text-text-400">부여</span> {ticket.issuedTicketCount}건
                    </p>
                  </div>
                  <span className="text-sm text-primary-500">{type[ticket.lessonType]}</span>
                </div>

                <div className="flex items-end justify-between">
                  <ul>
                    <li>
                      <span className="inline-block w-20 text-text-400">수강권 횟수</span> {ticket.defaultCount}회
                    </li>
                    <li>
                      <span className="inline-block w-20 text-text-400">수업 시간</span>{' '}
                      {ticket.bookableLessons[0].duration}분
                    </li>
                    <li>
                      <span className="inline-block w-20 text-text-400">수강권 기간</span> {ticket.defaultTerm}
                      {termUnit[ticket.defaultTermUnit]}
                    </li>
                  </ul>
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="20" fill="#EBF1FF" />
                    <path
                      d="M32 18V14C32 12.9 31.1 12 30 12H10C8.9 12 8.01 12.9 8.01 14V18C9.11 18 10 18.9 10 20C10 21.1 9.11 22 8 22V26C8 27.1 8.9 28 10 28H30C31.1 28 32 27.1 32 26V22C30.9 22 30 21.1 30 20C30 18.9 30.9 18 32 18ZM30 16.54C28.81 17.23 28 18.53 28 20C28 21.47 28.81 22.77 30 23.46V26H10V23.46C11.19 22.77 12 21.47 12 20C12 18.52 11.2 17.23 10.01 16.54L10 14H30V16.54Z"
                      fill="#BFD1FF"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M23.8672 15.8789L25.2812 17.293L21.0391 21.5352L19.625 22.9492L18.2109 21.5352L16.0859 19.4141L17.5 18L19.625 20.1211L23.8672 15.8789Z"
                      fill="#BFD1FF"
                    />
                  </svg>
                </div>
              </article>
            </Card>
          ))}
      </section>
    </>
  );
};
export default CenterTicket;
