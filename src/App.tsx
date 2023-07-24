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
        <SelectInstructor />
        <SelectDate />
        <SelectTime />
        <InputName />
        <InputContact />
        <InputMemo />
      </div>
    </RecoilRoot>
  );
}

export default App;
