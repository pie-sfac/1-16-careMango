import React from 'react';
import { useNavigate } from 'react-router-dom';

const ButtonAddMembers = () => {
  const navigate = useNavigate();

  // 회원 검색 페이지 이동
  const goMemberSearch = () => {
    navigate('/schedule/personal/searchMembers');
  };

  return (
    <label htmlFor="addMembers" className="my-5">
      <p className="small-title">
        회원 선택<span className="text-primary-300">*</span>
      </p>
      <button onClick={goMemberSearch}>선택하기</button>
    </label>
  );
};

export default ButtonAddMembers;
