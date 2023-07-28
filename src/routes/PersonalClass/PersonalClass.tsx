import React from 'react';
import SelectInstructor from '../../components/common/SelectInstructor';
import SelectClass from '../../components/createSchedule/SelectClass';
import SelectDate from '../../components/common/SelectDate';
import SelectTime from '../../components/common/SelectTime';
import ButtonComplete from '../../components/createSchedule/ButtonComplete';

const PersonalClass = () => {
  return (
    <>
      <h1 className="font-bold">개인 수업</h1>
      <SelectInstructor title="강사 선택" />
      <SelectInstructor title="회원 선택" />
      <SelectClass title="수업(수강권) 선택" flag={true} count={3} />
      <h2>참여 회원</h2>
      {/* 참여 회원 목록은 강사/회원 선택 시 자동으로 입력됨 */}
      <SelectDate title="일자 선택" />
      <SelectTime title="시간 선택" />
      <ButtonComplete />
    </>
  );
};

export default PersonalClass;
