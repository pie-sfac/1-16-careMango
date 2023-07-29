import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './index.css';
import CheckSchedule from './routes/checkSchedule';
import CreateCounseling from './routes/counseling/createCounseling';
import CheckCounseling from './routes/counseling/checkCounseling';
import Login from './routes/login';
import Main from './routes/main';
import ChangeSchedule from './routes/changeSchedule';

function App() {
  const accessToken = localStorage.getItem('accessToken');
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={accessToken ? <Navigate to="/main" /> : <Login />} />
          <Route path="/main" element={accessToken ? <Main /> : <Navigate to="/" />} />
          <Route path="/schedule/personal/:scheduleId" element={<CheckSchedule />} />
          <Route path="/schedule/personal/edit/:scheduleId" element={<ChangeSchedule />} />
          <Route path="/schedule/counseling/:counselingId" element={<CheckCounseling />} />
          <Route path="/schedule/createCounseling" element={<CreateCounseling />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
