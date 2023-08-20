import { ChangeEvent, useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { timeListState } from '@/atoms/counseling/counselingScheduleAtom';
import { axiosInstance } from '@/utils/apiInstance';
import { getTime } from '@/utils/date';
import { Staff } from '@/types/staffs/staffs';
import { StateType } from '@/types/counseling/counseling';
import Input from '@components/common/Input/Input';
import InputMemo from '@pages/counseling/components/InputMemo';
import SelectStaffs from './components/SelectStaffs';
import SubHeader from '@components/common/SubHeader/SubHeader';
import GetStaffsList from '@pages/counseling/getStaffsList';

const CreateCounseling = () => {
  const [state, setState] = useState<StateType>({
    userId: 0,
    memberId: 0,
    clientName: '',
    clientPhone: '',
    memo: '',
    startAt: '',
    endAt: '',
  });
  const [Id, setId] = useState(0);
  const [selectedStaff, setSelectedStaff] = useState<null | Staff>(null);
  const [showComponentForm, setShowComponentForm] = useState(true);
  const [_, setSchedules] = useState<StateType[]>([]);
  const timeList = useRecoilValue(timeListState);
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const location = useLocation() as { state: { selectedStaff: Staff } };

  useEffect(() => {
    setState((prev) => ({ ...prev, userId: Id }));
    if (location.state && location.state.selectedStaff) {
      setSelectedStaff(location.state.selectedStaff);
    }
  }, [Id]);

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

    const counselingData: StateType = {
      userId: Id,
      memberId: 0,
      clientName: state.clientName,
      clientPhone: state.clientPhone,
      memo: state.memo,
      startAt: state.startAt,
      endAt: state.endAt,
    };
    mutation.mutate(counselingData);
  };

  const allFieldsCompleted = state.userId && state.startAt && state.endAt && state.clientName && state.clientPhone;

  // console.log(state);

  return (
    <>
      {showComponentForm ? (
        <>
          <SubHeader title="일정 생성" />
          <div className="flex flex-col">
            <h1 className="main-title">상담</h1>
            <form onSubmit={handleSubmit}>
              <SelectStaffs
                selectedStaff={selectedStaff}
                setSelectedStaff={setSelectedStaff}
                setUserId={setId}
                setShowComponentForm={setShowComponentForm}
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
                disabled={mutation.isLoading}>
                완료
              </button>
            </form>
          </div>
        </>
      ) : (
        <GetStaffsList
          setShowComponentForm={setShowComponentForm}
          setSelectedStaff={setSelectedStaff}
          setUserId={setId}
        />
      )}
    </>
  );
};

export default CreateCounseling;
