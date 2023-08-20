import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDay, getTime } from '@/utils/date';
import { ScheduleEditData, ScheduleItemData } from '@/types/schedule/schedule';
import { axiosInstance } from '@/utils/apiInstance';
import { useMutation } from 'react-query';
import Input from '@components/common/Input/Input';
import NameTag from '@components/common/NameTag/NameTag';
import Select from '@components/common/Select/Select';
import CompleteButton from '@components/common/CompleteButton';

interface ScheduleUpdateFormProps {
  itemData: ScheduleItemData;
  isLoading: boolean;
  isError: boolean;
}

const ScheduleUpdateForm = ({ itemData, isLoading, isError }: ScheduleUpdateFormProps) => {
  const { scheduleId } = useParams();
  const [state, setState] = useState<ScheduleEditData>({ startAt: '', endAt: '' });
  const [date, setDate] = useState('');
  const [time, setTime] = useState({ startAt: '', endAt: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isError && itemData) {
      const initialState: ScheduleEditData = {
        startAt: itemData.startAt,
        endAt: itemData.endAt,
      };
      setState(initialState);
      setDate(getDay(initialState.startAt));
      setTime({ startAt: getTime(initialState.startAt), endAt: getTime(initialState.endAt) });
    }
  }, [isLoading, isError, itemData]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'date') {
      setDate(value);
      const [_, startTime] = state.startAt.split('T');
      const [__, endTime] = state.endAt.split('T');
      const updatedStart = value + 'T' + startTime;
      const updatedEnd = value + 'T' + endTime;
      setState((prev: ScheduleEditData) => ({ ...prev, startAt: updatedStart, endAt: updatedEnd }));
    }
    if (name === 'startAtTime' || name === 'endAtTime') {
      const [updateName] = name.split('Time');
      setTime((prev) => ({ ...prev, [updateName]: value }));
      const [date] = state.startAt.split('T');
      const updatedState = date + 'T' + value;
      setState((prev: ScheduleEditData) => ({ ...prev, [updateName]: updatedState }));
    } else {
      setState((prev: ScheduleEditData) => ({ ...prev, [name]: value }));
    }
  };

  const updateSchedule = async (updatedState: ScheduleEditData) => {
    const res = await axiosInstance.put(`/schedules/private-lesson/${scheduleId}`, updatedState);
    return res.data;
  };

  const { mutate, isLoading: isUpdateLoading } = useMutation(updateSchedule);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const updateState = { ...state, memo: '' };
    console.log('put호출', updateState);
    mutate(updateState, {
      onSuccess: () => {
        window.alert('변경되었습니다');
        navigate(-1);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input name="date" type="date" value={date} onChange={handleChange} label="일자 선택" required />

      <label htmlFor="start" className="block mt-10 mb-2">
        시간 선택
        <span className="text-primary-300">*</span>
      </label>
      <div className="flex items-center">
        <Input name="startAtTime" type="time" value={time.startAt} onChange={handleChange} required />~
        <Input name="endAtTime" type="time" value={time.endAt} onChange={handleChange} required />
      </div>

      <div className="my-5 mt-10 mb-2">
        <label>참여 회원</label>
        <NameTag name={itemData.attendanceHistories[0].member.name} disabled />
      </div>

      <div className="my-5 mt-10 mb-2">
        <label>담당 강사</label>
        <NameTag name={itemData.tutor.name} disabled />
      </div>

      <Select
        name="ticket"
        options={[{ label: `${itemData.issuedTicket.title}`, value: '' }]}
        value={itemData.issuedTicket.title}
        onChange={handleChange}
        label="수강권"
        width="w-80"
      />

      <CompleteButton state={state} text="완료" isLoading={isUpdateLoading} />
    </form>
  );
};
export default ScheduleUpdateForm;
