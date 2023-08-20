import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { axiosInstance } from '@/utils/apiInstance';
import { IssuedTicketsData } from '@/types/tickets/tickets';
import SubHeader from '@components/common/SubHeader/SubHeader';
import IssuedTicketItem from '@pages/tickets/components/IssuedTicketItem';
import { memberIdState } from '@/atoms/members/memberIdAtom';
import { ReactComponent as EmptyMembership } from '@/assets/icons/EmptyMembership.svg';
import { useQuery } from 'react-query';

type TabType = 'active' | 'deactive';

const IssuedTicketPage = ({ tab }: { tab?: boolean }) => {
  const navigate = useNavigate();
  const { memberId } = useParams<{ memberId: string | undefined }>();
  const setMemberId = useSetRecoilState(memberIdState);
  const [activeTab, setActiveTab] = useState<TabType>('active');

  const goTicketList = () => {
    if (memberId) setMemberId({ memberId });
    navigate(`/tickets/issue`);
  };

  const {
    data: issuedTicketsData,
    isLoading,
    isError,
  } = useQuery(['issuedTickets', memberId], async () => {
    const res = await axiosInstance.get(`/members/${memberId}/issued-tickets`);
    return res.data.issuedTickets;
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

  const activeTicketList = issuedTicketsData.filter((ticket: IssuedTicketsData) => !ticket.isCanceled);
  const deactiveTicketList = issuedTicketsData.filter((ticket: IssuedTicketsData) => ticket.isCanceled);

  return (
    <>
      <SubHeader
        title="회원 수강권"
        rightBtn={
          <button className="pl-5 text-base" type="button" onClick={() => goTicketList()}>
            부여하기
          </button>
        }
      />

      {!activeTicketList?.length && (
        <div className="flex-col w-full mt-16 flex-center">
          <EmptyMembership />
          <p className="p-3 my-1 base-font text-text-400">수강권을 부여해주세요.</p>
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
            {activeTicketList && <span>이용중 ({activeTicketList.length})</span>}
          </button>
          <button
            type="button"
            className={`flex-1 py-2 px-4 ${
              activeTab === 'deactive' ? 'border-b-2 border-primary-500 text-primary-500' : 'hover:bg-blue-50'
            }`}
            onClick={() => setActiveTab('deactive')}>
            {deactiveTicketList && <span>종료됨 ({deactiveTicketList.length})</span>}
          </button>
        </div>
      )}
      <section className="flex flex-wrap items-center w-full gap-16 mt-4">
        {activeTicketList &&
          activeTab === 'active' &&
          activeTicketList.map((ticket: IssuedTicketsData) => <IssuedTicketItem key={ticket.id} ticket={ticket} />)}
        {deactiveTicketList &&
          activeTab === 'deactive' &&
          deactiveTicketList.map((ticket: IssuedTicketsData) => (
            <IssuedTicketItem key={ticket.id} ticket={ticket} disabled />
          ))}
      </section>
    </>
  );
};
export default IssuedTicketPage;
