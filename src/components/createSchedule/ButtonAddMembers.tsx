import React from 'react';
import { useNavigate } from 'react-router-dom';

const ButtonAddMembers = () => {
  const navigate = useNavigate();

  // 회원 검색 페이지 이동
  const goMemberSearch = () => {
    navigate('/schedule/searchMembers');
  };

  return (
    <div>
      <h2 className="small-title">
        회원 선택<span className="text-primary-300">*</span>
      </h2>
      <button onClick={goMemberSearch}>선택하기</button>
    </div>
  );
};

export default ButtonAddMembers;
