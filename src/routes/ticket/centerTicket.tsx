import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import { TicketsData } from '../../types/tickets/tickets';
import axiosInstance from '../../utils/apiInstance';
import TicketItem from '../../components/centerTicket/TicketItem';

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

  useEffect(() => {
    // const timer = setTimeout(() => {
    //   setTicketList(ticketsData);
    // }, 500);
    // return () => clearTimeout(timer);
    getTickets();
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
        {ticketList && ticketList.map((ticket) => <TicketItem key={ticket.id} ticket={ticket} />)}
      </section>
    </>
  );
};
export default CenterTicket;
