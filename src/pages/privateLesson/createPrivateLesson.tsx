import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosInstance } from '@/utils/apiInstance';
import { getTime } from '@/utils/date';
import SelectDate from '@/components/common/SelectDate';
import SelectTime from '@/components/common/SelectTime';
import CompleteButton from '@/components/common/CompleteButton';
import ButtonAddPeople from '@pages/privateLesson/components/ButtonAddPeople';
import SubHeader from '@components/common/SubHeader/SubHeader';
import Input from '@components/common/Input/Input';
import Select from '@components/common/Select/Select';
import { Staff } from '@/types/staffs/staffs';
import { Member } from '@/types/members/members';
import { Tickets } from '@/types/tickets/tickets';

interface StateType {
  userId: number;
  issuedTicketId: number;
  startAt: string;
  endAt: string;
}

const initialState: StateType = {
  userId: 0,
  issuedTicketId: 0,
  startAt: '',
  endAt: '',
};

const CreatePrivateLesson = () => {
  const [selectedStaffId, setSelectedStaffId] = useState(0);
  const [selectedMemberId, setSelectedMemberId] = useState(0);
  const [date, setDate] = useState('');
  const [state, setState] = useState<StateType>(initialState);
  const [staffList, setStaffList] = useState<Staff | null>();
  const [memberList, setMemberList] = useState<Member | null>();
  const [ticketList, setTicketList] = useState<Tickets | null>();
  const navigate = useNavigate();
  const location = useLocation();

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

  // setSelectedStaffId(location.state.selectedId);
  // setSelectedMemberId(location.state.selectedId);

  const getStaff = async () => {
    const res = await axiosInstance.get('staffs');
    const selectedStaff = res.data.datas.filter((elem: Staff) => elem.id === selectedStaffId);
    console.log(res.data.datas);
    setStaffList(selectedStaff[0]);
  };

  const getMembers = async () => {
    const res = await axiosInstance.get('members');
    const selectedMember = res.data.datas.filter((elem: Member) => elem.id === selectedMemberId);
    console.log(res.data.datas);

    setMemberList(selectedMember[0]);
  };

  const getIssuedTickets = async (memberId: number) => {
    const res = await axiosInstance.get(`members/${memberId}/issued-tickets`);
    console.log(res.data.issuedTickets);

    setTicketList(res.data.issuedTickets);
  };

  // 일정 생성
  const createPrivateLesson = async (privateLessonData: StateType): Promise<StateType | undefined> => {
    try {
      const res = await axiosInstance.post('/schedules/private-lesson', privateLessonData);
      const createdPrivateLesson = res.data;
      navigate('/schedules');
      return createdPrivateLesson;
    } catch (err) {
      console.log(err);
    }
  };

  // 완료
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(state);
    createPrivateLesson(state);
    navigate('/schedule');
  };

  // 필수 입력 값들이 채워지면 완료 버튼 활성화
  const allFieldsCompleted = (): boolean => {
    return !!(state.userId && state.issuedTicketId && state.startAt && state.endAt);
  };

  useEffect(() => {
    getStaff();
    getMembers();
    getIssuedTickets(176);
  }, []);

  return (
    <>
      <SubHeader title="일정생성" />
      <div className="flex flex-col">
        <h1 className="main-title">개인 수업</h1>
        <div className="flex">
          {/* <ButtonAddPeople title="강사 선택" value="staff" /> */}
          <form onSubmit={handleSubmit}>
            <Select
              name="userId"
              options={[
                { label: '선택해주세요', value: 0 },
                { label: '스나이퍼', value: 2 },
              ]}
              value={state.userId}
              onChange={handleChange}
              label="강사 선택"
              width="w-1/6"
              required
            />
            {selectedStaffId ? <div>{staffList?.name}</div> : <div>없음</div>}
            {/* <Select
              name="member"
              options={[
                { label: '선택해주세요', value: 0 },
                { label: '회원1', value: 176 },
              ]}
              value=""
              onChange={handleChange}
              label="회원선택"
              width="w-1/6"
              required
            /> */}
            {selectedMemberId ? <div>{memberList?.name}</div> : <div>없음</div>}
            <Select
              name="issuedTicketId"
              options={[
                { label: '선택해주세요', value: 0 },
                { label: '테스트 수강권', value: 164 },
              ]}
              value={state.issuedTicketId}
              onChange={handleChange}
              label="수업(수강권) 선택"
              width="w-1/2"
              required
            />
            <h2>참여 회원</h2>
            <div>{memberList?.name}</div>
            <Input type="date" label="날짜 선택" value={date} onChange={onDateChange} required />
            <Input name="startAt" type="time" value={getTime(state.startAt)} onChange={handleChange} required /> ~
            <Input name="endAt" type="time" value={getTime(state.endAt)} onChange={handleChange} required />
            {/* <SelectDate label="일자 선택" type="date" onChange={handleChange} /> */}
            {/* <SelectTime title="시간 선택" onChange={onTimeChange} /> */}
            {/* <CompleteButton state={state} title="저장" /> */}
            <button
              className={`my-5 py-3 rounded ${
                allFieldsCompleted() ? 'bg-primary-500 text-white' : 'bg-bg-100 text-text-400 pointer-events-none'
              }`}
              type="submit"
              onClick={handleSubmit}>
              완료
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePrivateLesson;
