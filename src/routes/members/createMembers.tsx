import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Header from '../../components/common/Header';
import InputName from '../../components/common/InputName';
import SelectSex from '../../components/common/SelectSex';
import InputContact from '../../components/common/InputContact';
import InputBirth from '../../components/common/InputBirth';
import SelectJob from '../../components/common/SelectJob';
import SelectVisitRoute from '../../components/common/SelectVisitRoute';
import AgreeConditon from '../../components/members/AgreeCondition';
import { memberState } from '../../atoms/members/membersAtom';

function CreateMembers() {
  const [state, setState] = useRecoilState(memberState);

  // 회원관리 메인 페이지로
  const navigate = useNavigate();
  const goMainMembers = () => {
    console.log(state);
    navigate('/members');
  };

  // const goMainMembers = async () => {
  //   // API endpoint
  //   const API_URL = 'http://223.130.161.221/api/v1/members';

  //   // 데이터 생성 및 API로 전송
  //   try {
  //     const response = await fetch(API_URL, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(state), // state의 데이터를 JSON 형태로 변환
  //     });

  //     // 응답 확인
  //     if (!response.ok) {
  //       throw new Error('API request failed.');
  //     }

  //     const data = await response.json();

  //     // 정상적으로 완료되면 페이지 이동
  //     alert('성공');
  //     navigate('/members');
  //   } catch (error) {
  //     console.error('Failed to create member:', error);
  //     alert('실패');
  //   }
  // };

  // 필수 입력 값들이 채워지면 완료 버튼 활성화
  const allFieldsCompleted = () => !!(state.birthDate && state.sex && state.name && state.phone);
  return (
    <>
      <Header title="회원등록" />
      <div className="flex flex-col items-center">
        <div className="flex flex-col w-full max-w-md">
          <div className="flex flex-col items-center justify-center my-6">
            <h1 className="mb-3 text-4xl font-bold">회원정보</h1>
            <p>회원 정보를 등록하세요</p>
          </div>
          <InputName title="이름" onSelect={(inputName) => setState((prev) => ({ ...prev, name: inputName }))} />
          <SelectSex title="성별" onSelect={(selectSex) => setState((prev) => ({ ...prev, sex: selectSex }))} />
          <InputBirth
            title="생년월일"
            onSelect={(inputBirth) => setState((prev) => ({ ...prev, birthDate: inputBirth }))}
          />
          <InputContact
            title="휴대폰 번호"
            onSelect={(inputContact) => setState((prev) => ({ ...prev, phone: inputContact }))}
          />
          <SelectJob title="직업" onSelect={(selectJob) => setState((prev) => ({ ...prev, job: selectJob }))} />
          <SelectVisitRoute
            title="방문 경로"
            onSelect={(selectVisitRoute) => setState((prev) => ({ ...prev, visitRoute: selectVisitRoute }))}
          />
          <AgreeConditon
            title="회원 약관 동의"
            onSelect={(agreeConditon) => setState((prev) => ({ ...prev, agree: agreeConditon }))}
          />
        </div>
        <button
          className={`my-5 py-3 w-full rounded ${
            allFieldsCompleted() ? 'bg-primary-500 text-white' : 'bg-bg-100 text-text-400 pointer-events-none'
          }`}
          type="submit"
          onClick={goMainMembers}>
          완료
        </button>
      </div>
    </>
  );
}

export default CreateMembers;
