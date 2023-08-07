import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { atom, useRecoilState } from 'recoil';
import './index.css';
import CheckSchedule from './routes/schedule/checkSchedule';
import CreateCounseling from './routes/counseling/createCounseling';
import CheckCounseling from './routes/counseling/checkCounseling';
import Login from './routes/login';
import Home from './routes/home';
import Schedule from './routes/schedule';
import ScheduleApi from './routes/scheduleApi';
import ChangeSchedule from './routes/schedule/changeSchedule';
import CenterTicket from './routes/tickets/centerTicket';
import CreateTicket from './routes/tickets/createTicket';
import PersonalClass from './routes/createSchedule/PersonalClass';
import SearchMembers from './routes/createSchedule/searchMembers/searchMembers';
import ShowMembers from './routes/members/showMembers';
import CheckMembers from './routes/members/checkMembers';
import Layout from './components/layout/Layout';
import IssuedTickets from './routes/tickets/issuedTickets';
import TicketList from './routes/tickets/ticketList';
import TicketDetail from './routes/tickets/ticketDetail';
import ShowStaffs from './routes/staffs/showStaffs';
import CreateStaff from './routes/staffs/createStaff';

export const accessTokenState = atom({
  key: 'accessTokenState', // unique ID (with respect to other atoms/selectors)
  default: localStorage.getItem('accessToken') || '', // default value (aka initial value)
});

function App() {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={accessToken ? <Navigate to="/home" /> : <Login setAccessToken={setAccessToken} />} />
          <Route path="/home" element={accessToken ? <Home /> : <Navigate to="/" />} />
          <Route path="/schedule/personal/:scheduleId" element={<CheckSchedule />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/schedules" element={<ScheduleApi />} />
          <Route path="/schedule/personal/edit/:scheduleId" element={<ChangeSchedule />} />
          <Route path="/schedules/counseling/:scheduleId" element={<CheckCounseling />} />
          <Route path="/schedules/counseling" element={<CreateCounseling />} />
          <Route path="/tickets/centerTicket" element={<CenterTicket />} />
          <Route path="/tickets/centerTicket/new" element={<CreateTicket />} />
          <Route path="/schedule/personal/new" element={<PersonalClass />} />
          <Route path="/schedule/personal/searchMembers" element={<SearchMembers />} />
          <Route path="/members" element={<ShowMembers />} />
          <Route path="/members/:memberId" element={<CheckMembers />} />
          <Route path="/members/:memberId/issued-tickets" element={<IssuedTickets />} />
          <Route path="/tickets" element={<TicketList />} />
          <Route path="/tickets/:ticketId" element={<TicketDetail />} />
          <Route path="/staffs" element={<ShowStaffs />} />
          <Route path="/staffs/createStaff" element={<CreateStaff />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
