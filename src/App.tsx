import React from 'react';
import { RecoilRoot } from 'recoil';
import './index.css';
import InputMemo from './components/common/inputMemo';
import InputContact from './components/common/inputContact';
import SelectDate from './components/common/selectDate';
import SelectTime from './components/common/selectTime';
import InputName from './components/common/inputName';
import SelectInstructor from './components/common/selectInstructor';

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <SelectInstructor title="담당 강사 선택" />
        <SelectDate title="날짜 선택" />
        <SelectTime title="시간 선택" />
        <InputName title="이름" />
        <InputContact title="전화번호" />
        <InputMemo title="일정 메모" />
      </div>
    </RecoilRoot>
  );
}

export default App;
