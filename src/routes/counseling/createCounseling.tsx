import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import commonState from '../../atoms/commonAtom';
import SelectInstructor from '../../components/common/SelectInstructor';
import SelectDate from '../../components/common/SelectDate';
import SelectTime from '../../components/common/SelectTime';
import InputName from '../../components/common/InputName';
import InputContact from '../../components/common/InputContact';
import InputMemo from '../../components/common/InputMemo';

function CreateCounseling() {
  const common = useRecoilValue(commonState);

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  // 필수 입력 값들이 채워지면 완료 버튼 활성화
  const allFieldsCompleted = () =>
    common.instructor && common.date && common.startTime && common.endTime && common.name && common.contact;

  return (
    <>
      <header className="flex justify-between py-3 mb-2 text-xl font-bold border-b-2 border-gray-300">
        <p className="flex">
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
        </p>
      </header>
      <div className="flex flex-col">
        <h1 className="main-title">상담</h1>
        <SelectInstructor title="담당 강사 선택" />
        <SelectDate title="날짜 선택" />
        <SelectTime title="시간 선택" />
        <InputName title="이름" />
        <InputContact title="전화번호" />
        <InputMemo title="일정 메모" />
        <button
          className={`my-5 py-3 rounded ${
            allFieldsCompleted() ? 'bg-primary-500 text-white' : 'bg-bg-100 text-text-400 pointer-events-none'
          }`}
          type="submit"
          onClick={() => console.log(common)}>
          완료
        </button>
      </div>
    </>
  );
}

export default CreateCounseling;
