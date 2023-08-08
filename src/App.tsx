import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import CheckSchedule from './routes/schedule/checkSchedule';
import CreateCounseling from './routes/counseling/createCounseling';
import GetCounseling from './routes/counseling/getCounseling';
import UpdateCounseling from './routes/counseling/updateCounseling';
import Home from './routes/home';
import Schedule from './routes/schedule';
import ScheduleApi from './routes/scheduleApi';
import ChangeSchedule from './routes/schedule/changeSchedule';
import CenterTicket from './routes/tickets/centerTicket/centerTicketList';
import CreateTicket from './routes/tickets/centerTicket/createTicket';
import PersonalClass from './routes/createSchedule/PersonalClass';
import SearchMembers from './routes/createSchedule/searchMembers/searchMembers';
import ShowMembers from './routes/members/showMembers';
import CheckMembers from './routes/members/checkMembers';
import Layout from './components/layout/Layout';
import IssuedTicketList from './routes/tickets/issuedTicket/issuedTicketList';
import AllTicketList from './routes/tickets/issuedTicket/allTicketList';
import IssuedTicketDetail from './routes/tickets/issuedTicket/issuedTicketDetail';
import ShowStaffs from './routes/staffs/showStaffs';
import MyPage from './routes/myPage';
import SearchResults from './components/common/SearchResults';
import LoginRouter from './routes/auth/LoginRouter';

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
