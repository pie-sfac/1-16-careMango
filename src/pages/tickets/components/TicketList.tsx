import { useCallback, useEffect, useState } from 'react';
import { axiosInstance } from '@/utils/apiInstance';
import { TicketsData } from '@/types/tickets/tickets';
import TicketItem from './TicketItem';
import { ReactComponent as EmptyMembership } from '@/assets/icons/EmptyMembership.svg';

type TabType = 'active' | 'deactive';

const TicketList = ({ tab }: { tab?: boolean }) => {
  const [activeTicketList, setActiveTicketList] = useState<TicketsData[] | null>(null);
  const [deactiveTicketList, setDeactiveTicketList] = useState<TicketsData[] | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('active');

  const getTickets = useCallback(async () => {
    const res = await axiosInstance.get('tickets');
    const tickets = res.data.tickets;
    const activeTickets = tickets.filter((ticket: TicketsData) => ticket.isActive === true);
    const deActiveTickets = tickets.filter((ticket: TicketsData) => ticket.isActive === false);
    setActiveTicketList(activeTickets);
    setDeactiveTicketList(deActiveTickets);
  }, []);

  useEffect(() => {
    getTickets();
  }, [getTickets]);

  return (
    <>
      {!activeTicketList?.length && (
        <div className="flex-col w-full mt-24 flex-center">
          <EmptyMembership />
          <p className="p-3 my-1 text-center base-font text-text-400">
            센터에서 생성한 수강권이 없습니다.
            <br />
            수강권을 생성해 주세요.
          </p>
        </div>
      )}
      {tab && activeTicketList?.length && (
        <div className="flex w-56 mt-8 border-b tabs border-line-300 text-text-400">
          <button
            type="button"
            className={`flex-1 py-2 px-4 ${
              activeTab === 'active' ? 'border-b-2 border-primary-500 text-primary-500' : 'hover:bg-blue-50'
            }`}
            onClick={() => setActiveTab('active')}>
            {activeTicketList && <span>판매중 ({activeTicketList.length})</span>}
          </button>
          <button
            type="button"
            className={`flex-1 py-2 px-4 ${
              activeTab === 'deactive' ? 'border-b-2 border-primary-500 text-primary-500' : 'hover:bg-blue-50'
            }`}
            onClick={() => setActiveTab('deactive')}>
            {deactiveTicketList && <span>판매종료 ({deactiveTicketList.length})</span>}
          </button>
        </div>
      )}
      <section className="flex flex-wrap items-center w-full gap-16 mt-4">
        {activeTicketList &&
          activeTab === 'active' &&
          activeTicketList.map((ticket) => <TicketItem key={ticket.id} ticket={ticket} />)}
        {deactiveTicketList &&
          activeTab === 'deactive' &&
          deactiveTicketList.map((ticket) => <TicketItem key={ticket.id} ticket={ticket} />)}
      </section>
    </>
  );
};
export default TicketList;
