import React, { useState } from 'react';
import register from '@/assets/images/Graphic_Member_registered.png';
import { ReactComponent as Close } from '@/assets/icons/Close.svg';

interface CompleteMembersProps {
  onExit: () => void;
}

const RegisterMembers = ({ onExit }: CompleteMembersProps) => {
  // 회원 조회 페이지로
  const goMainMembers = () => {
    onExit(); // 이 함수는 props로 전달된 함수입니다.
  };
  return (
    <div className="flex flex-col items-center">
      {/* Close button style */}
      <div className="flex justify-end w-full mt-4 mb-4">
        <button type="button" onClick={goMainMembers}>
          <Close />
        </button>
      </div>

      {/* Registration completion message style */}
      <div className="mb-4 text-center">
        <h1 className="mb-4 text-2xl font-bold">등록완료</h1>
        <p>박길동님의 회원 정보가 생성되었습니다.</p>
        <p className="mb-4">문진을 바로 시작하시겠어요?</p>
        <img className="mt-4 mb-4" src={register} alt="register" />
      </div>

      {/* Buttons style */}
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
