import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginRouter from '@pages/auth/LoginRouter';
import Home from '@pages/home/home';
import Schedule from '@pages/schedule/schedule';
import ScheduleApi from '@pages/scheduleApi';
import ScheduleDetailPage from '@pages/schedule/getScheduleDetail';
import ScheduleUpdatePage from '@pages/schedule/updateSchedule';
import CreateCounseling from '@pages/counseling/createCounseling';
import GetCounselingDetail from '@pages/counseling/getCounselingDetail';
import UpdateCounseling from '@pages/counseling/updateCounseling';
import CenterTicketPage from '@pages/tickets/centerTicket/getTicketList';
import TicketDetailPage from '@pages/tickets/centerTicket/getTicketDetail';
import IssuedListPage from '@pages/tickets/centerTicket/getIssuedList';
import CreateTicketPage from '@pages/tickets/centerTicket/createTicket';
import UpdateTicket from '@pages/tickets/centerTicket/updateTicket';
import IssuedTicketPage from '@pages/tickets/issuedTicket/getIssuedTicket';
import IssuedTicketDetail from '@pages/tickets/issuedTicket/getIssuedTicketDetail';
import TicketListPage from '@pages/tickets/issuedTicket/getTicketList';
import CreateIssuedTicket from '@pages/tickets/issuedTicket/createIssuedTicket';
import CreatePrivateLesson from '@pages/schedule/createPrivateLesson';
import SearchPeople from '@pages/privateLesson/searchPeople/searchPeople';
import CreateMembers from '@pages/members/createMembers';
import RegisterMembers from '@pages/members/registerMembers';
import UpdateMembers from '@pages/members/updateMembers';
import GetMembers from '@pages/members/getMembers';
import GetMembersDetail from '@pages/members/getMembersDetail';
import Layout from './components/layout/Layout';
import ShowStaffs from '@pages/staffs/getStaffs';
import MyPage from '@pages/myPage';
import SearchResults from '@components/common/SearchResults';
import GetStaffDetailPage from '@pages/staffs/getStaffDetail';
import UpdateStaffInfoPage from '@pages/staffs/updateStaffInfo';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route element={<LoginRouter />}>
            <Route path="/" element={<Home />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/schedules" element={<ScheduleApi />} />
            <Route path="/schedule/counseling/update/:scheduleId" element={<UpdateCounseling />} />
            <Route path="/schedule/counseling/:scheduleId" element={<GetCounselingDetail />} />
            <Route path="/schedule/counseling/new" element={<CreateCounseling />} />
            <Route path="/schedule/personal/:scheduleId" element={<ScheduleDetailPage />} />
            <Route path="/schedule/personal/edit/:scheduleId" element={<ScheduleUpdatePage />} />
            <Route path="/tickets/center" element={<CenterTicketPage />} />
            <Route path="/tickets/center/new" element={<CreateTicketPage />} />
            <Route path="/tickets/:ticketId/center" element={<TicketDetailPage />} />
            <Route path="/tickets/:ticketId/edit" element={<UpdateTicket />} />
            <Route path="/tickets/:ticketId/issued-tickets" element={<IssuedListPage />} />
            <Route path="/tickets/:ticketId/issue" element={<CreateIssuedTicket />} />
            <Route path="/members/:memberId/issued-tickets" element={<IssuedTicketPage tab />} />
            <Route path="/issued-tickets/:ticketId" element={<IssuedTicketDetail />} />
            <Route path="/tickets/issue" element={<TicketListPage />} />
            <Route path="/schedule/privateLesson/new" element={<CreatePrivateLesson />} />
            <Route path="/schedule/privateLesson/new/searchPeople" element={<SearchPeople />} />
            <Route path="/members" element={<GetMembers />} />
            <Route path="/members/new" element={<CreateMembers />} />
            <Route path="/members/new/register" element={<RegisterMembers />} />
            <Route path="/members/update/:memberId" element={<UpdateMembers />} />
            <Route path="/members/:memberId" element={<GetMembersDetail />} />
            <Route path="/staffs" element={<ShowStaffs />} />
            <Route path="/staffs/:staffId" element={<GetStaffDetailPage />} />
            <Route path="/staffs/updateInfo/:staffId" element={<UpdateStaffInfoPage />} />
            <Route path="/myPage" element={<MyPage />} />
            <Route path="/search-results" element={<SearchResults />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
