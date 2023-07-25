import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './index.css';
import CheckSchedule from './routes/checkSchedule';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" />
          <Route path="/schedule/:scheduleId" element={<CheckSchedule />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
