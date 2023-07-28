import React from 'react';
import { useNavigate } from 'react-router-dom';

const ButtonAddMembers = () => {
  const navigate = useNavigate();

  // 회원 검색 페이지 이동
  const goMemberSearch = () => {
    navigate('/searchMembers', { replace: true });
  };

  return (
    <div>
      <h2>
        회원 선택<p className="small-title">*</p>
      </h2>
      <button onClick={goMemberSearch}>선택하기</button>
    </div>
  );
};

export default ButtonAddMembers;
