import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import SelectCounselor from '../../components/common/SelectCounselor';
import SelectDate from '../../components/common/SelectDate';
import SelectTime from '../../components/common/SelectTime';
import InputName from '../../components/common/InputName';
import InputContact from '../../components/common/InputContact';
import InputMemo from '../../components/common/InputMemo';

interface CounselingState {
  counselor: string;
  date: string;
  clientName: string;
  clientPhone: string;
  memo: string;
  startAt: string;
  endAt: string;
}

function CreateCounseling() {
  const [state, setState] = useState<CounselingState>({
    // 강사와 날짜는 api에 나와있지 않음
    counselor: '', // ?????
    date: '', // ?????
    clientName: '',
    clientPhone: '',
    memo: '',
    startAt: '',
    endAt: '',
  });

  // 이전 페이지로
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  // 조회 페이지에서 변경 버튼 클릭 시 기존 데이터 로드하여 수정
  const { counselingId } = useParams<{ counselingId?: string }>();
  useEffect(() => {
    if (counselingId) {
      // 기존 상담 데이터 로드(axios 사용하여 API에서 해당 상담 데이터 가져오기)
      axios.get(`http://localhost:5173/schedule/counseling/createCounseling/${counselingId}`).then((res) => {
        const { data } = res;
        setState({
          counselor: data.counselor,
          date: data.date,
          clientName: data.clientName,
          clientPhone: data.clientPhone,
          memo: data.memo,
          startAt: data.startAt,
          endAt: data.endAt,
        });
      });
    }
  }, [counselingId]);

  // 일정관리 메인 페이지로
  const goMainSchedule = () => {
    console.log(state);
    navigate('/schedule');
  };

  // 필수 입력 값들이 채워지면 완료 버튼 활성화
  const allFieldsCompleted = (): boolean =>
    !!(state.counselor && state.date && state.startAt && state.endAt && state.clientName && state.clientPhone);

  return (
    <>
      <header className="flex justify-between py-3 mb-2 text-xl font-bold border-b-2 border-gray-300">
        <div className="flex">
          <button onClick={handleBackClick} type="submit" className="focus:outline-none">
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
        <h1 className="main-title">상담</h1>
        <SelectCounselor
          title="담당 강사 선택"
          onSelect={(selectedCounselor) => setState((prev) => ({ ...prev, counselor: selectedCounselor }))}
        />
        <SelectDate
          title="날짜 선택"
          onSelect={(selectedDate) => setState((prev) => ({ ...prev, date: selectedDate }))}
        />
        <SelectTime
          title="시간 선택"
          onSelect={(selectedTime) =>
            setState((prev) => ({ ...prev, startAt: selectedTime.startTime, endAt: selectedTime.endTime }))
          }
        />
        <InputName
          title="이름"
          onSelect={(selectedName) => setState((prev) => ({ ...prev, clientName: selectedName }))}
        />
        <InputContact
          title="연락처"
          onSelect={(selectedPhone) => setState((prev) => ({ ...prev, clientPhone: selectedPhone }))}
        />
        <InputMemo
          title="일정 메모"
          onSelect={(selectedMemo) => setState((prev) => ({ ...prev, memo: selectedMemo }))}
        />
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
}

export default CreateCounseling;
