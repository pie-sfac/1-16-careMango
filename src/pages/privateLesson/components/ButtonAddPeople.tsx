import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchPeople from '../searchPeople/searchPeople';

interface ButtonAddPersonProps {
  title: string;
  value: string;
}

const ButtonAddPeople = ({ title, value }: ButtonAddPersonProps) => {
  const navigate = useNavigate();

  return (
    <label htmlFor="addMembers" className="my-5">
      <p className="small-title">
        {title}
        <span className="text-primary-300">*</span>
      </p>
      <button onClick={() => navigate('/schedule/privateLesson/new/searchPeople', { state: { value: value } })}>
        선택하기
      </button>
    </label>
  );
};

export default ButtonAddPeople;
