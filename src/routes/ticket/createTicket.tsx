import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import { LessonTypeEnum, TermUnitEnum } from '../../enums/Ticket';
import Select from '../../components/centerTicket/Select';
import Input from '../../components/centerTicket/Input';
import axiosInstance from '../../utils/apiInstance';

const CreateTicket = () => {
  interface StateType {
    lessonType: string;
    title: string;
    defaultTerm: number;
    defaultTermUnit: string;
    duration: number;
    defaultCount: number;
    maxServiceCount: number;
  }
  const initialState = {
    lessonType: '',
    title: '',
    defaultTerm: 0,
    defaultTermUnit: 'MONTH',
    duration: 0,
    defaultCount: 0,
    maxServiceCount: 0,
  };

  const [state, setState] = useState<StateType>(initialState);
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prev): StateType => ({ ...prev, [name]: value }));
  };

  const inputs = Object.values(state);
  const allFieldsCompleted = () => inputs.every((input) => input !== '' && input !== 0);

  const createTicket = async (ticketData: StateType): Promise<StateType | undefined> => {
    try {
      const res = await axiosInstance.post('/tickets', ticketData);
      const createdTicket = res.data;
      navigate('/tickets/centerTicket');
      return createdTicket;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(state);
    createTicket(state);
  };

  return (
    <>
      <Header title="수강권 추가" />
      <h1 className="main-title">수강권 추가</h1>
      <p>센터의 수강권을 추가하세요</p>

      <h2 className="my-10 small-title">수강권 정보 설정</h2>
      <form onSubmit={handleSubmit}>
        <Select
          name="lessonType"
          options={[
            { label: '선택해주세요', value: '' },
            { label: LessonTypeEnum.SINGLE, value: 'SINGLE' },
          ]}
          value={state.lessonType}
          onChange={handleChange}
          label="수업 유형"
        />
        <br />

        <Input
          name="title"
          type="text"
          value={state.title}
          onChange={handleChange}
          label="수강권명"
          placeholder="수강권명을 입력해주세요(15자이내)"
        />
        <br />

        <Input
          name="defaultTerm"
          type="number"
          value={state.defaultTerm}
          onChange={handleChange}
          label="수강권 기간"
          placeholder={initialState.defaultTerm}
        />
        <Select
          name="defaultTermUnit"
          options={[
            { label: TermUnitEnum.DAY, value: 'DAY' },
            { label: TermUnitEnum.WEEK, value: 'WEEK' },
            { label: TermUnitEnum.MONTH, value: 'MONTH' },
            { label: TermUnitEnum.YEAR, value: 'YEAR' },
          ]}
          value={state.defaultTermUnit}
          onChange={handleChange}
        />
        <br />

        <Input
          name="duration"
          type="number"
          value={state.duration}
          onChange={handleChange}
          label="시간"
          placeholder={initialState.duration}
        />
        <br />

        <Input
          name="defaultCount"
          type="number"
          value={state.defaultCount}
          onChange={handleChange}
          label="기본횟수"
          placeholder={initialState.defaultCount}
        />
        <br />

        <Input
          name="maxServiceCount"
          type="number"
          value={state.maxServiceCount}
          onChange={handleChange}
          label="서비스 횟수"
          placeholder={initialState.maxServiceCount}
          leftBtn={
            <button type="button">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 12H18" stroke="#505050" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          }
          rightBtn={
            <button type="button">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11 18C11 18.5523 11.4477 19 12 19C12.5523 19 13 18.5523 13 18V13H18C18.5523 13 19 12.5523 19 12C19 11.4477 18.5523 11 18 11H13V6C13 5.44771 12.5523 5 12 5C11.4477 5 11 5.44771 11 6V11H6C5.44772 11 5 11.4477 5 12C5 12.5523 5.44772 13 6 13H11V18Z"
                  fill="#505050"
                />
              </svg>
            </button>
          }
        />

        <button
          className={`my-5 py-3 rounded ${
            allFieldsCompleted() ? 'bg-primary-500 text-white' : 'bg-bg-100 text-text-400 pointer-events-none'
          }`}
          type="submit">
          저장
        </button>
      </form>
    </>
  );
};
export default CreateTicket;
