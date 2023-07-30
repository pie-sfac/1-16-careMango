import React, { useState } from 'react';
import Header from '../../components/common/Header';

const CreateTicket = () => {
  const onSubmit = () => {};

  type LessonType = 'SINGLE' | 'DUET' | 'TRIPLE' | 'GROUP';
  type LessonTypeMap = {
    [key in LessonType]: string;
  };

  type TermUnit = 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
  type TermUnitMap = {
    [key in TermUnit]: string;
  };

  const type: LessonTypeMap = {
    SINGLE: '1:1 개인수업',
    DUET: '2:1 수업',
    TRIPLE: '3:1 수업',
    GROUP: '그룹 수업',
  };

  const termUnit: TermUnitMap = {
    DAY: '일',
    WEEK: '주',
    MONTH: '개월',
    YEAR: '년',
  };
  const typeKeys = Object.keys(type);
  const typeOption = Object.values(type);

  const unitKeys = Object.keys(termUnit);
  const unitOption = Object.values(termUnit);

  const [state, setState] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setState(event.target.value);
  };

  return (
    <>
      <Header title="수강권 추가" />
      <h1 className="main-title">수강권 추가</h1>
      <p>센터의 수강권을 추가하세요</p>

      <h2 className="my-10 small-title">수강권 정보 설정</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="lessonType">수업 유형</label>
        {/* <select id="lessonType" name="lessonType" value={state} onChange={handleChange}>
          {typeOption.map((opt, i) => (
            <option value={type.SINGLE}>{opt}</option>
          ))}
        </select> */}
      </form>
    </>
  );
};
export default CreateTicket;
