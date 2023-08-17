import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface ButtonAddPersonProps {
  title: string;
  value: string;
}

const ButtonAddPeople = ({ title, value }: ButtonAddPersonProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  return (
    <label htmlFor="addMembers" className="my-5">
      <p className="small-title">
        {title}
        <span className="text-primary-300">*</span>
      </p>
      <button
        className={
          isClicked
            ? 'p-2 border border-2 border-primary-300 rounded-lg text-primary-300'
            : 'p-2 border border-2 border-primary-300 rounded-lg text-primary-300'
        }
        onClick={() => navigate('/schedule/privateLesson/new/searchPeople', { state: { value: value } })}>
        선택하기 +
      </button>
    </label>
  );
};

export default ButtonAddPeople;
