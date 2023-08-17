import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Back } from '@/assets/icons/Back.svg';

type HeaderProps = {
  title: string;
  rightBtn?: React.ReactNode;
};

const SubHeader = ({ title, rightBtn }: HeaderProps) => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <header className="flex justify-between py-3 ">
      <div className="flex">
        <button onClick={handleBackClick} type="button" className="focus:outline-none">
          <Back />
        </button>
        <p className="text-base">{title}</p>
      </div>
      {rightBtn}
    </header>
  );
};
export default SubHeader;
