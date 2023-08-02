import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../utils/apiInstance';
import SelectCounselor from '../../components/common/SelectCounselor';
import SelectDate from '../../components/common/SelectDate';
import SelectTime from '../../components/common/SelectTime';
import InputName from '../../components/common/InputName';
import InputContact from '../../components/common/InputContact';
import InputMemo from '../../components/common/InputMemo';
import { ReactComponent as Back } from '../../assets/icons/Back.svg';

interface StateType {
  userId: number;
  memberId: number;
  clientName: string;
  clientPhone: string;
  memo: string;
  startAt: string;
  endAt: string;
}

const initialState: StateType = {
  userId: 0,
  memberId: 0,
  clientName: '',
  clientPhone: '',
  memo: '',
  startAt: '',
  endAt: '',
};

const CreateCounseling = () => {
  const [state, setState] = useState<StateType>(initialState);

  const onChange = (name: string, value: string | number) => {
    setState((prev): StateType => ({ ...prev, [name]: value }));
  };

  const onTimeChange = (selectedTime: { startAt: string; endAt: string }) => {
    // 현재 날짜
    const currentDate = state.startAt.split('T')[0];

    // 선택된 시간에 현재 날짜 추가
    const updatedStartAt = `${currentDate}T${selectedTime.startAt}`;
    const updatedEndAt = `${currentDate}T${selectedTime.endAt}`;

    setState((prev) => ({
      ...prev,
      startAt: updatedStartAt,
      endAt: updatedEndAt,
    }));
  };

  // 이전 페이지로
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  // 일정관리 메인 페이지로
  const goMainSchedule = () => {
    console.log(state);
    navigate('/schedule');
  };

  const createCounseling = async (counselingData: StateType): Promise<StateType | undefined> => {
    try {
      const res = await axiosInstance.post('/counseling', counselingData);
      const createdCounseling = res.data;
      navigate('/counseling', { state: { refetch: true } });
      return createdCounseling;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    createCounseling(state);
  };

  // 필수 입력 값들이 채워지면 완료 버튼 활성화
  const allFieldsCompleted = (): boolean =>
    !!(state.userId && state.startAt && state.endAt && state.clientName && state.clientPhone);

  console.log(state);

  return (
    <>
      <header className="flex justify-between py-3 mb-2 text-xl font-bold border-b-2 border-gray-300">
        <div className="flex">
          <button onClick={handleBackClick} type="submit" className="focus:outline-none">
            <Back />
          </button>
          <p>일정 생성</p>
        </div>
      </header>
      <div className="flex flex-col">
        <h1 className="main-title">상담</h1>
        <form onSubmit={handleSubmit}>
          <SelectCounselor title="담당 강사 선택" onChange={(value) => onChange('userId', value)} />
          <SelectDate
            title="날짜 선택"
            onChange={(value) => {
              onChange('startAt', value);
              onChange('endAt', value);
            }}
          />
          <SelectTime title="시간 선택" onChange={onTimeChange} />
          <InputName title="이름" onChange={(value) => onChange('clientName', value)} />
          <InputContact title="연락처" onChange={(value) => onChange('clientPhone', value)} />
          <InputMemo title="일정 메모" onChange={(value) => onChange('memo', value)} />
          <button
            className={`my-5 py-3 rounded ${
              allFieldsCompleted() ? 'bg-primary-500 text-white' : 'bg-bg-100 text-text-400 pointer-events-none'
            }`}
            type="submit"
            onClick={goMainSchedule}>
            완료
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateCounseling;
