import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/schedule/:scheduleId" element={<CheckSchedule />} />
          <Route path="/schedule/:counselingId" element={<CheckCounseling />} />
          <Route path="/schedule/createCounseling" element={<CreateCounseling />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
