import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import register from '@/assets/images/Graphic_Member_registered.png';
import { ReactComponent as Close } from '@/assets/icons/Close.svg';

const RegisterMembers = () => {
  const location = useLocation();
  const memberName = location.state?.memberName || '';
  const navigate = useNavigate();

  const goMainMembers = () => navigate('/members');

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-end w-full mt-4 mb-4">
        <button type="button" onClick={goMainMembers}>
          <Close />
        </button>
      </div>

      <div className="mb-4 text-center">
        <h1 className="mb-4 text-2xl font-bold">등록완료</h1>
        <p>{memberName}님의 회원 정보가 생성되었습니다.</p>
        <p className="mb-4">문진을 바로 시작하시겠어요?</p>
        <img className="mt-4 mb-4" src={register} alt="register" />
      </div>

      <div className="flex justify-center w-full">
        <button type="button" onClick={goMainMembers} className="w-1/4 p-2 mx-3 rounded bg-bg-100">
          닫기
        </button>
        <button type="button" className="w-1/4 p-2 mx-3 text-white rounded bg-primary-500">
          문진 시작
        </button>
      </div>
    </div>
  );
};

export default RegisterMembers;
