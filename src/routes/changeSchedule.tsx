import React from 'react';
import SelectInstructor from '../components/common/SelectInstructor';
import SelectDate from '../components/common/SelectDate';
import SelectTime from '../components/common/SelectTime';
import Header from '../components/common/Header';

const ChangeSchedule = () => (
  <>
    <Header title="일정 변경" />
    <div className="flex flex-col">
      <h1 className="main-title">개인수업</h1>
      {/* 변경 일정 기본 데이터값 넣어주기 */}
      <SelectDate title="일자 선택" defaultState="2023-07-20" />
      <SelectTime title="시간 선택" defaultState={{ startTime: '12:30', endTime: '13:30' }} />
      <SelectInstructor title="참여 회원" defaultState="회원이름" />
      <SelectInstructor title="담당 강사 선택" defaultState="박강사" />
      <button className="py-3 my-5 text-white rounded bg-primary-500" type="submit">
        완료
      </button>
    </div>
  </>
);

export default ChangeSchedule;
