import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import SubHeader from '@components/common/SubHeader/SubHeader';
import NameTag from '@components/common/NameTag/NameTag';
import { itemDataState } from '@/atoms/schedule/itemDataAtom';
import { getDay, getTime } from '@/utils/date';
import Input from '@components/common/Input/Input';
import { ScheduleEditData } from '@/types/schedule/schedule';
import { axiosInstance } from '@/utils/apiInstance';
import CompleteButton from '@components/common/CompleteButton';

const ScheduleUpdatePage = () => {
  const itemData = useRecoilValue(itemDataState);
  console.log(itemData);

  const { scheduleId } = useParams();

  const initialState: ScheduleEditData = {
    memo: itemData!.memo,
    startAt: itemData!.startAt,
    endAt: itemData!.endAt,
  };

  const [state, setState] = useState<ScheduleEditData>(initialState);
  const [date, setDate] = useState(getDay(initialState.startAt));
  const [time, setTime] = useState({ startAt: getTime(initialState.startAt), endAt: getTime(initialState.endAt) });

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(name, value);
    if (name === 'date') {
      setDate(value);
      const startTime = state.startAt.split('T')[1];
      const endTime = state.startAt.split('T')[1];
      const updatedStart = value + 'T' + startTime;
      const updatedEnd = value + 'T' + endTime;
      console.log(updatedStart);
      setState((prev: ScheduleEditData) => ({ ...prev, startAt: updatedStart, end: updatedEnd }));
    }
    if (name === 'startAtTime' || name === 'endAtTime') {
      const updateName = name.split('Time')[0];
      setTime({ ...time, [updateName]: value });
      const date = state.startAt.split('T')[0];
      const updatedState = date + 'T' + value;
      console.log(updatedState);
      setState((prev: ScheduleEditData) => ({ ...prev, [updateName]: updatedState }));
    } else {
      setState((prev: ScheduleEditData) => ({ ...prev, [name]: value }));
    }
  };

  // 스케쥴변경 로직
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('put호출', state);
    try {
      const res = await axiosInstance.put(`/schedules/private-lesson/${scheduleId}`, state);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SubHeader title="일정 변경" />
      <div className="flex flex-col">
        <h1 className="main-title">개인수업</h1>
        <form onSubmit={handleSubmit}>
          <Input name="date" type="date" value={date} onChange={handleChange} label="일자 선택" required />

          <label htmlFor="start" className="block mt-10 mb-2">
            시간 선택 <span className="text-primary-300">*</span>
          </label>
          <div className="flex items-center">
            <Input name="startAtTime" type="time" value={time.startAt} onChange={handleChange} required />~
            <Input name="endAtTime" type="time" value={time.endAt} onChange={handleChange} required />
          </div>

          <div className="my-5">
            <h2 className="small-title m-b">참여 회원</h2>
            <NameTag name={itemData!.attendanceHistories[0].member.name} disabled />
          </div>

          <div className="my-5">
            <h2 className="small-title">담당 강사</h2>
            <NameTag name={itemData!.tutor.name} disabled />
          </div>

          <CompleteButton state={state} text="완료" />
        </form>
      </div>
    </>
  );
};

export default ScheduleUpdatePage;
