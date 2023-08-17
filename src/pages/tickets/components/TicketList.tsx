import { useCallback, useEffect, useState } from 'react';
import { axiosInstance } from '@/utils/apiInstance';
import { TicketsData } from '@/types/tickets/tickets';
import TicketItem from './TicketItem';

type TabType = 'active' | 'deactive';

const TicketList = () => {
  const [ticketList, setTicketList] = useState<TicketsData[] | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('active');

  const getTickets = useCallback(async () => {
    const res = await axiosInstance.get('tickets');
    setTicketList(res.data.tickets);
    console.log(res.data.tickets);
  }, []);

  useEffect(() => {
    getTickets();
  }, [getTickets]);

  return (
    <>
      <div className="flex w-48 mt-8 border-b tabs border-line-300">
        <button
          type="button"
          className={`flex-1 py-2 px-4 ${
            activeTab === 'active' ? 'border-b-2 border-primary-500 text-primary-500' : 'hover:bg-blue-50'
          }`}
          onClick={() => setActiveTab('active')}>
          판매중{}
        </button>
        <button
          type="button"
          className={`flex-1 py-2 px-4 ${
            activeTab === 'deactive' ? 'border-b-2 border-primary-500 text-primary-500' : 'hover:bg-blue-50'
          }`}
          onClick={() => setActiveTab('deactive')}>
          판매종료
        </button>
      </div>
      <section className="flex flex-wrap items-center w-full gap-16 mt-4">
        {ticketList && ticketList.map((ticket) => <TicketItem key={ticket.id} ticket={ticket} />)}
      </section>
    </>
  );
};
export default TicketList;
