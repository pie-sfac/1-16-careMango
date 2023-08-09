import React, { useCallback, useEffect, useState } from 'react';
import { axiosInstance } from '@/utils/apiInstance';
import { TicketsData } from '@/types/tickets/tickets';
import TicketItem from './TicketItem';

const TicketList = () => {
  const [ticketList, setTicketList] = useState<TicketsData[] | null>(null);

  const getTickets = useCallback(async () => {
    const res = await axiosInstance.get('tickets');
    setTicketList(res.data.tickets);
    console.log(res.data.tickets);
  }, []);

  useEffect(() => {
    getTickets();
  }, [getTickets]);

  return (
    <section className="flex flex-wrap items-center w-full gap-16 mt-20">
      {ticketList && ticketList.map((ticket) => <TicketItem key={ticket.id} ticket={ticket} />)}
    </section>
  );
};
export default TicketList;
