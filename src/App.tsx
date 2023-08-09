import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import CheckSchedule from './pages/schedule/checkSchedule';
import CreateCounseling from './pages/counseling/createCounseling';
import GetCounseling from './pages/counseling/getCounseling';
import UpdateCounseling from './pages/counseling/updateCounseling';
import Home from './pages/home';
import Schedule from './pages/schedule';
import ScheduleApi from './pages/scheduleApi';
import ChangeSchedule from './pages/schedule/changeSchedule';
import CenterTicket from './pages/tickets/centerTicket/centerTicketList';
import CreateTicket from './pages/tickets/centerTicket/createTicket';
import PersonalClass from './pages/createSchedule/PersonalClass';
import SearchMembers from './pages/createSchedule/searchMembers/searchMembers';
import ShowMembers from './pages/members/showMembers';
import CheckMembers from './pages/members/checkMembers';
import Layout from './components/layout/Layout';
import IssuedTicketList from './pages/tickets/issuedTicket/issuedTicketList';
import AllTicketList from './pages/tickets/issuedTicket/allTicketList';
import IssuedTicketDetail from './pages/tickets/issuedTicket/issuedTicketDetail';
import ShowStaffs from './pages/staffs/showStaffs';
import MyPage from './pages/myPage';
import SearchResults from './components/common/SearchResults';
import LoginRouter from './pages/auth/LoginRouter';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route element={<LoginRouter />}>
            <Route path="/" element={<Home />} />
            <Route path="/schedule/personal/:scheduleId" element={<CheckSchedule />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/schedules" element={<ScheduleApi />} />
            <Route path="/schedule/personal/edit/:scheduleId" element={<ChangeSchedule />} />
            <Route path="/schedules/counseling/update/:scheduleId" element={<UpdateCounseling />} />
            <Route path="/schedules/counseling/:scheduleId" element={<GetCounseling />} />
            <Route path="/schedules/counseling" element={<CreateCounseling />} />
            <Route path="/tickets/centerTicket" element={<CenterTicket />} />
            <Route path="/tickets/centerTicket/new" element={<CreateTicket />} />
            <Route path="/schedule/personal/new" element={<PersonalClass />} />
            <Route path="/schedule/personal/searchMembers" element={<SearchMembers />} />
            <Route path="/members" element={<ShowMembers />} />
            <Route path="/members/:memberId" element={<CheckMembers />} />
            <Route path="/members/:memberId/issued-tickets" element={<IssuedTicketList />} />
            <Route path="/tickets" element={<AllTicketList />} />
            <Route path="/tickets/:ticketId" element={<IssuedTicketDetail />} />
            <Route path="/staffs" element={<ShowStaffs />} />
            <Route path="/myPage" element={<MyPage />} />
            <Route path="/search-results" element={<SearchResults />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
