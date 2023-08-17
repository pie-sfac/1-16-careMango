import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { axiosInstance } from '@/utils/apiInstance';
import { IssuedTicketsData } from '@/types/tickets/tickets';
import SubHeader from '@components/common/SubHeader/SubHeader';
import IssuedTicketItem from '@pages/tickets/components/IssuedTicketItem';
import { memberIdState } from '@/atoms/members/memberIdAtom';

const IssuedTicketPage = () => {
  const [issuedList, setIssuedList] = useState<IssuedTicketsData[] | null>(null);
  const navigate = useNavigate();
  const { memberId } = useParams<{ memberId: string | undefined }>();
  const setMemberId = useSetRecoilState(memberIdState);

  const goTicketList = () => {
    if (memberId) setMemberId({ memberId });
    navigate(`/tickets`);
  };

  const getIssuedTickets = useCallback(async () => {
    const res = await axiosInstance.get(`/members/${memberId}/issued-tickets`);
    setIssuedList(res.data.issuedTickets);
    console.log(res.data.issuedTickets);
  }, [memberId]);

  useEffect(() => {
    getIssuedTickets();
  }, [getIssuedTickets]);

  return (
    <>
      <SubHeader
        title="수강권"
        rightBtn={
          <button className="pl-5 text-base" type="button" onClick={() => goTicketList()}>
            부여
          </button>
        }
      />
      <section className="flex flex-wrap items-center w-full gap-16 mt-20">
        {!issuedList?.length && <span>수강권을 부여해주세요</span>}
        {issuedList &&
          issuedList.map((ticket: IssuedTicketsData) => <IssuedTicketItem key={ticket.id} ticket={ticket} />)}
      </section>
    </>
  );
};
export default IssuedTicketPage;
