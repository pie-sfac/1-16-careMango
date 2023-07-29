import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './index.css';
import InputMemo from './components/common/InputMemo';
import InputContact from './components/common/InputContact';
import SelectDate from './components/common/SelectDate';
import SelectTime from './components/common/SelectTime';
import InputName from './components/common/InputName';
import SelectInstructor from './components/common/SelectInstructor';
import CheckSchedule from './routes/checkSchedule';
import CreateCounseling from './routes/counseling/createCounseling';
import CheckCounseling from './routes/counseling/checkCounseling';
import Login from './routes/login';
import Main from './routes/main';

function App() {
  const accessToken = localStorage.getItem('accessToken');
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={accessToken ? <Navigate to="/main" /> : <Login />} />
          <Route path="/main" element={accessToken ? <Main /> : <Navigate to="/" />} />
          <Route path="/schedule/:scheduleId" element={<CheckSchedule />} />
          <Route path="/schedule/:counselingId" element={<CheckCounseling />} />
          <Route path="/schedule/createCounseling" element={<CreateCounseling />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
