import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MembersData } from '../../types/members/members';
import { ReactComponent as Profile24 } from '../../assets/icons/Profile_24.svg';

type MembersType = MembersData['datas'][number];

const MembersItem = ({ members }: { members: MembersType }) => {
  // 회원 누르면 해당 회원 정보 페이지로
  const navigate = useNavigate();
  const goMemberInfo = () => {
    navigate(`/members/${members.id}`);
  };

  return (
    <button type="button" onClick={goMemberInfo}>
      <div key={members.id} className="flex items-center justify-between p-3 my-1 bg-white rounded-md base-font">
        <div className="flex">
          <Profile24 />
          <p className="flex items-center justify-center ml-4 font-bold">{members.name}</p>
        </div>
        <div className="flex mr-96">
          <p className="mr-5">{members.sex === 'MALE' ? '남' : '여'}</p>
          <p className="mr-5">22.00.00~22.00.00</p>
          <p className="mr-5">100회 / 100회</p>
          <p className="mr-5">4.2/5.0점</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="px-2 py-1 mr-5 rounded-md bg-bg-100">김파이</p>
          <p>{members.createdAt.split('T')[0]}</p>
        </div>
      </div>
    </button>
  );
};

export default MembersItem;
