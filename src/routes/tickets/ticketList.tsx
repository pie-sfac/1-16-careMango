import React, { useCallback, useEffect, useState } from 'react';
import SubHeader from '../../components/common/SubHeader';
import { axiosInstance } from '../../utils/apiInstance';
import TicketItem from '../../components/tickets/TicketItem';
import { TicketsData } from '../../types/tickets/tickets';

const TicketList = () => {
  const [ticketList, setTicketList] = useState<TicketsData[] | null>(null);

  const getTickets = useCallback(async () => {
    const res = await axiosInstance.get('/tickets');
    setTicketList(res.data.tickets);
  }, []);

  useEffect(() => {
    getTickets();
  }, [getTickets]);

  return (
    <>
      <SubHeader title="수강권 부여" />
      <section className="flex flex-wrap items-center w-full gap-16 mt-20">
        {ticketList && ticketList.map((ticket) => <TicketItem key={ticket.id} ticket={ticket} />)}
      </section>
    </>
  );
};
export default TicketList;
