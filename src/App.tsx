import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { atom, useRecoilState } from 'recoil';
import './index.css';
import CheckSchedule from './routes/checkSchedule';
import CreateCounseling from './routes/counseling/createCounseling';
import CheckCounseling from './routes/counseling/checkCounseling';
import Login from './routes/login';
import Main from './routes/main';
import ChangeSchedule from './routes/changeSchedule';
import CenterTicket from './routes/ticket/centerTicket';
import CreateTicket from './routes/ticket/createTicket';

export const accessTokenState = atom({
  key: 'accessTokenState', // unique ID (with respect to other atoms/selectors)
  default: localStorage.getItem('accessToken') || '', // default value (aka initial value)
});

function App() {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={accessToken ? <Navigate to="/main" /> : <Login setAccessToken={setAccessToken} />} />
        <Route path="/main" element={accessToken ? <Main /> : <Navigate to="/" />} />
        <Route path="/schedule/personal/:scheduleId" element={<CheckSchedule />} />
        <Route path="/schedule/personal/edit/:scheduleId" element={<ChangeSchedule />} />
        <Route path="/schedule/counseling/:counselingId" element={<CheckCounseling />} />
        <Route path="/schedule/createCounseling" element={<CreateCounseling />} />
        <Route path="/tickets/centerTicket" element={<CenterTicket />} />
        <Route path="/tickets/centerTicket/new" element={<CreateTicket />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
