import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { schedulesState } from '@/atoms/counseling/counselingScheduleAtom';
import { axiosInstance } from '@/utils/apiInstance';
import { getDay, getTime } from '@/utils/date';
import SelectDate from '@components/common/SelectDate';
import SelectTime from '@components/common/SelectTime';
import Input from '@components/common/Input/Input';
import Select from '@components/common/Select/Select';
import InputMemo from '@components/common/InputMemo';
import { StateType } from '@/types/counseling/counseling';
import SubHeader from '@components/common/SubHeader';

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
  const setSchedules = useSetRecoilState(schedulesState);
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  // 생성 API
  const createCounseling = async (counselingData: StateType): Promise<StateType | undefined> => {
    try {
      const res = await axiosInstance.post('/schedules/counseling', counselingData);
      const createdCounseling = res.data;
      navigate('/schedules/counseling/new', { state: { refetch: true } });
      console.log('res.status=', res.status);
      return createdCounseling;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (
    eventOrValue: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement> | string,
  ) => {
    let name: string, value: string;

    if (typeof eventOrValue === 'string') {
      name = 'memo';
      value = eventOrValue;
    } else {
      name = eventOrValue.target.name;
      value = eventOrValue.target.value;
    }

    if (name === 'startAt' || name === 'endAt') {
      const combinedDateTime = `${date}T${value}`;
      setState((prev): StateType => ({ ...prev, [name]: combinedDateTime }));
    } else {
      setState((prev): StateType => ({ ...prev, [name]: value }));
    }
  };

  const onDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  // 전화번호 입력 시 자동 하이픈
  const numberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: rawValue } = event.target;
    let value = rawValue.replace(/\D/g, '');

    if (value.length > 11) return;

    if (value.length <= 7) {
      value = value.replace(/(\d{3})(\d{1,4})/, '$1-$2');
    } else if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
    }

    setState((prev) => ({ ...prev, clientPhone: value }));
  };

  // 완료
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // 시작 시간이 끝나는 시간보다 늦은지 확인
    if (new Date(state.startAt) >= new Date(state.endAt)) {
      alert('시작 시간이 끝나는 시간보다 늦습니다. 다시 입력해주세요.');
      return;
    }

    createCounseling(state).then((createdCounseling) => {
      if (createdCounseling) {
        setSchedules((prevSchedules) => [...prevSchedules, createdCounseling]);
        navigate('/schedules');
      }
    });
  };

  // 필수 입력 값들이 채워지면 완료 버튼 활성화
  const allFieldsCompleted = (): boolean =>
    !!(state.userId && state.startAt && state.endAt && state.clientName && state.clientPhone);

  console.log(state);
  return (
    <>
      <SubHeader title="일정 생성" />
      <div className="flex flex-col">
        <h1 className="main-title">상담</h1>
        <form onSubmit={handleSubmit}>
          <Select
            name="userId"
            options={[
              { label: '선택해주세요', value: 0 },
              { label: '박강사', value: 1 },
              { label: '김강사', value: 2 },
            ]}
            value={state.userId}
            onChange={handleChange}
            label="담당 강사 선택"
            width="w-2/12"
            required
          />
          {/* <SelectDate label="날짜 선택" type="date" onChange={handleChange} /> */}
          <Input type="date" label="날짜 선택" value={date} onChange={onDate} required />
          {/* <SelectTime title="시간 선택" onChange={onTimeChange} /> */}
          <label htmlFor="startAt" className="block mt-10 mb-2">
            시간 선택 <span className="text-primary-300">*</span>
          </label>
          <div className="flex items-center">
            <Input name="startAt" type="time" value={getTime(state.startAt)} onChange={handleChange} required /> ~
            <Input name="endAt" type="time" value={getTime(state.endAt)} onChange={handleChange} required />
          </div>
          <Input
            type="text"
            name="clientName"
            value={state.clientName}
            onChange={handleChange}
            label="이름"
            placeholder="이름을 입력해주세요."
            width="w-4/12"
            required
          />
          <Input
            type="text"
            name="clientPhone"
            value={state.clientPhone}
            onChange={numberChange}
            label="연락처"
            placeholder="연락처를 입력해주세요."
            width="w-4/12"
            required
          />
          <InputMemo
            title="일정 메모"
            // name="memo"
            value={state.memo}
            width="w-4/12"
            height="h-32"
            onChange={handleChange}
          />
          <p className="mt-4 text-right text-gray-400">{state.memo.length}/500자</p>
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
