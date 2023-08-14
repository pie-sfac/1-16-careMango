import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosInstance } from '@/utils/apiInstance';
import SelectDate from '@/components/common/SelectDate';
import SelectTime from '@/components/common/SelectTime';
import CompleteButton from '@/components/common/CompleteButton';
import ButtonAddPeople from '@pages/privateLesson/components/ButtonAddPeople';
import SubHeader from '@components/common/SubHeader';
import Input from '@components/common/Input/Input';
import Select from '@components/common/Select/Select';
import { Staff } from '@/types/staffs/staffs';

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
  const [state, setState] = useState<StateType>(initialState);
  const [staff, setStaff] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  // const selectedId = location.state.selectedId;

  // const getStaff = async () => {
  //   const res = await axiosInstance.get('staffs');
  //   res.data.datas.filter((elem: Staff) => elem.id === selectedId);
  // };

  const addPrivateLesson = async (privateLessonData: StateType) => {
    try {
      const res = await axiosInstance.post('/schedules/private-lesson');
    } catch (err) {
      console.log(err);
    }
  };

  // 일정관리 메인 페이지로
  const goMainSchedule = () => {
    console.log(state);
    navigate('/schedule');
  };

  // 필수 입력 값들이 채워지면 완료 버튼 활성화
  const allFieldsCompleted = (): boolean => {
    return !!(state.userId && state.issuedTicketId && state.startAt && state.endAt);
  };

  useEffect(() => {});

  return (
    <>
      <SubHeader title="일정생성" />
      <div className="flex flex-col">
        <h1 className="main-title">개인 수업</h1>
        <ButtonAddPeople title="강사 선택" value="staff" />
        {/* {selectedId ? <div>{}</div> : <div>없음</div>} */}
        <ButtonAddPeople title="회원 선택" value="member" />

        {/* <Select name="ticketId" options={[]} /> */}

        <h2>참여 회원</h2>
        {/* 참여 회원 목록은 강사/회원 선택 시 자동으로 입력됨 */}
        <SelectDate label="일자 선택" />
        <SelectTime title="시간 선택" />
        {/* <CompleteButton state={state} title="저장" /> */}
        <button
          className={`my-5 py-3 rounded ${
            allFieldsCompleted() ? 'bg-primary-500 text-white' : 'bg-bg-100 text-text-400 pointer-events-none'
          }`}
          type="submit"
          onClick={goMainSchedule}>
          완료
        </button>
      </div>
    </>
  );
};

export default CreatePrivateLesson;
