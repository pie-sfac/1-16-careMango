import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { schedulesState } from '../../atoms/counseling/counselingScheduleAtom';
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
  const schedules = useRecoilValue(schedulesState);
  const setSchedules = useSetRecoilState(schedulesState);
  const navigate = useNavigate();

  // API
  const createCounseling = async (counselingData: StateType): Promise<StateType | undefined> => {
    try {
      const res = await axiosInstance.post('/schedules/counseling', counselingData);
      const createdCounseling = res.data;
      navigate('/schedules/counseling', { state: { refetch: true } });
      // console.log(state);
      console.log('res.status=', res.status);
      return createdCounseling;
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = (name: string, value: string | number) => {
    setState((prev): StateType => ({ ...prev, [name]: value }));
  };

  // 시간 선택
  const onTimeChange = (selectedTime: { startAt: string; endAt: string }) => {
    // 현재 날짜
    const currentDate = state.startAt.split('T')[0];

    // 선택된 시간에 현재 날짜 추가
    const updatedStartAt = `${currentDate}T${selectedTime.startAt}`;
    const updatedEndAt = `${currentDate}T${selectedTime.endAt}`;

    // 겹치는 시간 확인
    const isOverlapping = schedules.some(
      (schedule: { endAt: string; startAt: string }) =>
        new Date(updatedStartAt) < new Date(schedule.endAt) && new Date(updatedEndAt) > new Date(schedule.startAt),
    );

    if (isOverlapping) {
      alert('선택하신 시간대와 겹치는 일정이 있습니다. 시간을 다시 설정해 주세요.');
    } else if (new Date(updatedStartAt) >= new Date(updatedEndAt)) {
      alert('시작 시간이 끝나는 시간보다 늦습니다. 다시 입력해주세요.');
    } else {
      setState((prev) => ({
        ...prev,
        startAt: updatedStartAt,
        endAt: updatedEndAt,
      }));
    }
  };

  // 완료
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    createCounseling(state).then((createdCounseling) => {
      if (createdCounseling) {
        setSchedules((prevSchedules) => [...prevSchedules, createdCounseling]);
        navigate('/schedules');
      }
    });
  };

  // 이전 페이지로
  const handleBackClick = () => {
    navigate(-1);
  };

  // 필수 입력 값들이 채워지면 완료 버튼 활성화
  const allFieldsCompleted = (): boolean =>
    !!(state.userId && state.startAt && state.endAt && state.clientName && state.clientPhone);

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
            className={`my-5 py-3 w-full rounded ${
              allFieldsCompleted() ? 'bg-primary-500 text-white' : 'bg-bg-100 text-text-400 pointer-events-none'
            }`}
            type="button"
            onClick={handleSubmit}>
            완료
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateCounseling;
