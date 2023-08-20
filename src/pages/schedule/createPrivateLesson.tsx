import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '@/utils/apiInstance';
import { getTime } from '@/utils/date';
import SubHeader from '@components/common/SubHeader/SubHeader';
import Input from '@components/common/Input/Input';
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
  const [selectedMemberId, setSelectedMemberId] = useState(0);
  const [date, setDate] = useState('');
  const [state, setState] = useState<StateType>(initialState);
  const [staffList, setStaffList] = useState<Staff[] | null>();
  const [memberList, setMemberList] = useState<Member[] | null>();
  const [ticketList, setTicketList] = useState<Tickets[] | null>();
  const navigate = useNavigate();

  const onDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
    console.log(state);
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
    console.log(state);
  };

  // 회원 선택
  const selectMember = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMemberId(parseInt(event.target.value));
    getIssuedTickets(parseInt(event.target.value));
    console.log(state);
  };

  const getStaff = async () => {
    const res = await axiosInstance.get('staffs');
    setStaffList(res.data.datas);
  };

  const getMembers = async () => {
    const res = await axiosInstance.get('members');
    setMemberList(res.data.datas);
  };

  const getIssuedTickets = async (memberId: number) => {
    const res = await axiosInstance.get(`members/${memberId}/issued-tickets`);
    // console.log(res.data.issuedTickets);

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

    if (selectedMemberId) {
      getIssuedTickets(selectedMemberId);
    }
  }, []);

  return (
    <>
      <SubHeader title="일정생성" />
      <div className="flex flex-col">
        <h1 className="main-title">개인 수업</h1>
        <div className="flex">
          {/* <ButtonAddPeople title="강사 선택" value="staff" /> */}
          <form onSubmit={handleSubmit}>
            <label>
              강사 선택
              <select name="userId" onChange={handleChange} value={state.userId} required>
                <option value={0}>선택하세요</option>
                {staffList?.map((item: Staff) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              회원 선택
              <select name="member" onChange={selectMember} required>
                <option value={0}>선택하세요</option>
                {memberList?.map((item: Member) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              수업(수강권) 선택
              <select name="issuedTicketId" onChange={handleChange} required>
                <option value={0}>선택하세요</option>
                {ticketList?.map((item: Tickets) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </label>
            <h2>참여 회원</h2>
            <Input type="date" label="날짜 선택" value={date} onChange={onDateChange} required />
            <Input name="startAt" type="time" value={getTime(state.startAt)} onChange={handleChange} required /> ~
            <Input name="endAt" type="time" value={getTime(state.endAt)} onChange={handleChange} required />
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
