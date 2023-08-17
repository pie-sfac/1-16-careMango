import React, { ChangeEvent, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { timeListState } from '@/atoms/counseling/counselingScheduleAtom';
import { axiosInstance } from '@/utils/apiInstance';
import { getTime } from '@/utils/date';
import Input from '@components/common/Input/Input';
import Select from '@components/common/Select/Select';
import InputMemo from '@pages/counseling/components/InputMemo';
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
  const { userId, startAt, endAt, clientName, clientPhone } = state;
  const [_, setSchedules] = useState<StateType[]>([]);
  const timeList = useRecoilValue(timeListState);
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const onDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
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

  const createCounseling = async (data: StateType) => {
    const res = await axiosInstance.post('/schedules/counseling', data);
    if (res.status === 200 || res.status === 201) {
      console.log('성공');
    }
    return res.data;
  };

  const mutation = useMutation(createCounseling, {
    onSuccess: (data) => {
      setSchedules((prev: StateType[]) => [...prev, data]);
      navigate('/schedules');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const hasOverlap = timeList.some(([existingStart, existingEnd]) => {
      return (
        (new Date(existingStart) <= new Date(state.startAt) && new Date(state.startAt) < new Date(existingEnd)) ||
        (new Date(existingStart) < new Date(state.endAt) && new Date(state.endAt) <= new Date(existingEnd)) ||
        (new Date(state.startAt) <= new Date(existingStart) && new Date(existingStart) < new Date(state.endAt)) ||
        (new Date(state.startAt) < new Date(existingEnd) && new Date(existingEnd) <= new Date(state.endAt))
      );
    });

    if (hasOverlap) {
      alert('선택하신 시간대와 겹치는 일정이 있습니다. 시간을 다시 설정해 주세요.');
      return;
    }

    if (new Date(state.startAt) >= new Date(state.endAt)) {
      alert('시작 시간이 끝나는 시간보다 늦습니다. 다시 입력해주세요.');
      return;
    }
    mutation.mutate(state);
  };

  const allFieldsCompleted = userId && startAt && endAt && clientName && clientPhone;

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
          <Input type="date" label="날짜 선택" value={date} onChange={onDateChange} required />
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
          <InputMemo title="일정 메모" value={state.memo} width="w-4/12" height="h-32" onChange={handleChange} />
          <button
            className={`my-5 py-3 w-full rounded ${
              allFieldsCompleted ? 'bg-primary-500 text-white' : 'bg-bg-100 text-text-400 pointer-events-none'
            }`}
            type="submit"
            onClick={handleSubmit}
            disabled={mutation.isLoading}>
            완료
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateCounseling;
