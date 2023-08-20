import { useState } from 'react';
import { axiosInstance } from '@/utils/apiInstance';
import { TicketsData } from '@/types/tickets/tickets';
import TicketItem from './TicketItem';
import { ReactComponent as EmptyMembership } from '@/assets/icons/EmptyMembership.svg';
import { useQuery } from 'react-query';

type TabType = 'active' | 'deactive';

const TicketList = ({ tab }: { tab?: boolean }) => {
  const [activeTab, setActiveTab] = useState<TabType>('active');

  const fetchTickets = async () => {
    const res = await axiosInstance.get('tickets');
    return res.data.tickets;
  };

  const { data: tickets, isLoading, isError } = useQuery<TicketsData[]>('tickets', fetchTickets);

  const activeTicketList = tickets?.filter((ticket: TicketsData) => ticket.isActive === true) || [];
  const deactiveTicketList = tickets?.filter((ticket: TicketsData) => ticket.isActive === false) || [];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

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
          deactiveTicketList.map((ticket) => <TicketItem key={ticket.id} ticket={ticket} disabled />)}
      </section>
    </>
  );
};
export default TicketList;
