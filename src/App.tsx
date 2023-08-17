import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import { QueryClientProvider, QueryClient } from 'react-query';
import ScheduleDetailPage from '@pages/schedule/getScheduleDetail';
import ScheduleUpdatePage from '@pages/schedule/updateSchedule';
import CreateCounseling from '@pages/counseling/createCounseling';
import GetCounselingDetail from '@pages/counseling/getCounselingDetail';
import UpdateCounseling from '@pages/counseling/updateCounseling';
import GetStaffsList from '@pages/counseling/getStaffsList';
import Home from '@pages/home/home';
import Schedule from '@pages/schedule/schedule';
import ScheduleApi from '@pages/scheduleApi';
import CenterTicketPage from '@pages/tickets/centerTicket/getTicketList';
import TicketDetailPage from '@pages/tickets/centerTicket/getTicketDetail';
import IssuedListPage from '@pages/tickets/centerTicket/getIssuedList';
import CreateTicketPage from '@pages/tickets/centerTicket/createTicket';
import CreatePrivateLesson from '@/pages/privateLesson/createPrivateLesson';
import SearchPeople from '@pages/privateLesson/searchPeople/searchPeople';
import CreateMembers from '@pages/members/createMembers';
import RegisterMembers from '@pages/members/registerMembers';
import UpdateMembers from '@pages/members/updateMembers';
import GetMembers from '@pages/members/getMembers';
import GetMembersDetail from '@pages/members/getMembersDetail';
import Layout from './components/layout/Layout';
import IssuedTicketPage from '@pages/tickets/issuedTicket/getIssuedTicket';
import IssuedTicketDetail from '@pages/tickets/issuedTicket/getIssuedTicketDetail';
import TicketListPage from '@pages/tickets/issuedTicket/getTicketList';
import CreateIssuedTicket from '@pages/tickets/issuedTicket/createIssuedTicket';
import ShowStaffs from '@pages/staffs/getStaffs';
import MyPage from '@pages/myPage';
import SearchResults from '@components/common/SearchResults';
import LoginRouter from '@pages/auth/LoginRouter';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route element={<LoginRouter />}>
              <Route path="/" element={<Home />} />
              <Route path="/schedule/personal/:scheduleId" element={<ScheduleDetailPage />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/schedules" element={<ScheduleApi />} />
              <Route path="/schedule/personal/edit/:scheduleId" element={<ScheduleUpdatePage />} />
              <Route path="/schedules/counseling/update/:scheduleId" element={<UpdateCounseling />} />
              <Route path="/schedules/counseling/:scheduleId" element={<GetCounselingDetail />} />
              <Route path="/schedules/counseling/new" element={<CreateCounseling />} />
              <Route path="/schedules/counseling/new/staffs" element={<GetStaffsList />} />
              <Route path="/tickets/centerTicket" element={<CenterTicketPage />} />
              <Route path="/tickets/centerTicket/new" element={<CreateTicketPage />} />
              <Route path="/schedule/privateLesson/new" element={<CreatePrivateLesson />} />
              <Route path="/schedule/privateLesson/new/searchPeople" element={<SearchPeople />} />
              <Route path="/members" element={<GetMembers />} />
              <Route path="/members/new" element={<CreateMembers />} />
              <Route path="/members/new/register" element={<RegisterMembers />} />
              <Route path="/members/update/:memberId" element={<UpdateMembers />} />
              <Route path="/members/:memberId" element={<GetMembersDetail />} />
              <Route path="/members/:memberId/issued-tickets" element={<IssuedTicketPage />} />
              <Route path="/tickets" element={<TicketListPage />} />
              <Route path="/tickets/:ticketId" element={<IssuedTicketDetail />} />
              <Route path="/staffs" element={<ShowStaffs />} />
              <Route path="/myPage" element={<MyPage />} />
              <Route path="/search-results" element={<SearchResults />} />
            </Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
