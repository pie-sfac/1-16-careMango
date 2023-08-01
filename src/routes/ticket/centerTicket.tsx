import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import { TicketsData } from '../../types/tickets/tickets';
import { axiosInstance } from '../../utils/apiInstance';
import TicketItem from '../../components/centerTicket/TicketItem';

const CenterTicket = () => {
  const [ticketList, setTicketList] = useState<TicketsData[] | null>(null);
  const navigate = useNavigate();

  const getTickets = useCallback(async () => {
    const res = await axiosInstance.get('tickets');
    setTicketList(res.data.tickets);
    console.log(res.data.tickets);
  }, []);

  const onClickAdd = () => {
    navigate(`/tickets/centerTicket/new`);
  };

  useEffect(() => {
    getTickets();
  }, [getTickets]);

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
