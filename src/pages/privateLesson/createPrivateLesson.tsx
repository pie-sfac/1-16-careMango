import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SelectDate from '@/components/common/SelectDate';
import SelectTime from '@/components/common/SelectTime';
import CompleteButton from '@/components/common/CompleteButton';
import ButtonAddMembers from '@pages/privateLesson/components/ButtonAddMembers';

interface Class {
  instructor: string;
  member: string;
  ticket: string;
  date: string;
  startAt: string;
  endAt: string;
}

const CreatePrivateLesson = () => {
  const [state, setState] = useState<Class>({
    instructor: '',
    member: '',
    ticket: '',
    date: '',
    startAt: '',
    endAt: '',
  });

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

  // 필수 입력 값들이 채워지면 완료 버튼 활성화
  const allFieldsCompleted = (): boolean => {
    return !!(state.instructor && state.member && state.ticket && state.date && state.startAt && state.endAt);
  };

  useEffect(() => {});

  return (
    <>
      <header className="flex justify-between py-3 mb-2 text-xl font-bold border-b-2 border-gray-300">
        <div className="flex">
          <button onClick={handleBackClick} className="focus::outline-none">
            <svg
              className="mr-2"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none">
              <path
                d="M16.7071 3.29289C17.0976 3.68342 17.0976 4.31658 16.7071 4.70711L9.41421 12L16.7071 19.2929C17.0976 19.6834 17.0976 20.3166 16.7071 20.7071C16.3166 21.0976 15.6834 21.0976 15.2929 20.7071L7.29289 12.7071C6.90237 12.3166 6.90237 11.6834 7.29289 11.2929L15.2929 3.29289C15.6834 2.90237 16.3166 2.90237 16.7071 3.29289Z"
                fill="#505050"
              />
            </svg>
          </button>
          <p>일정 생성</p>
        </div>
      </header>
      <div className="flex flex-col">
        <h1 className="main-title">개인 수업</h1>
        <ButtonAddMembers />

        <h2>참여 회원</h2>
        {/* 참여 회원 목록은 강사/회원 선택 시 자동으로 입력됨 */}
        <SelectDate label="일자 선택" />
        <SelectTime title="시간 선택" />
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
