import React from 'react';
import SubHeader from '@components/common/SubHeader';
import TicketList from '@pages/tickets/components/TicketList';

const TicketListPage = () => (
  <>
    <SubHeader title="수강권 부여" />
    <TicketList />
  </>
);
export default TicketListPage;
