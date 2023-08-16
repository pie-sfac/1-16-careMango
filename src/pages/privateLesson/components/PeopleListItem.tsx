import React from 'react';
import { MembersData } from '@/types/members/members';
import { StaffsData } from '@/types/staffs/staffs';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Profile_24 } from '@/assets/icons/Profile_24.svg';

type MembersType = MembersData['datas'][number];
type StaffsType = StaffsData['datas'][number];

const PeopleListItem = ({ people }: { people: MembersType | StaffsType }) => {
  const navigate = useNavigate();
  const itemSelectClick = (id?: number) => {
    navigate('/schedule/privateLesson/new', { state: { selectedId: id } });
  };
  return (
    <button className="w-full" onDoubleClick={() => itemSelectClick(people.id)}>
      <li key={people.id} className="flex items-center p-3 my-1 bg-white rounded-md base-font cursor-pointer">
        <div className="flex">
          <Profile_24 />
        </div>
        <span className="ml-4 bg-gray-100 text-gray-400 pl-1 pr-1">회원</span>
        <p className="ml-4 font-bold">{people.name}</p>
        <p className="ml-4">{people.phone.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)}</p>
      </li>
    </button>
  );
};

export default PeopleListItem;
