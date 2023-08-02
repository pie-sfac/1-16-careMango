import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

interface Staff {
  id: number;
  name: string;
  phone: string;
  memberCount: number;
  rating: number;
  memo: string;
}

const staffDatas: Staff[] = [
  {
    id: 1,
    name: '김직원',
    phone: '01012341234',
    memberCount: 1,
    rating: 3,
    memo: '메모1',
  },
  {
    id: 2,
    name: '박직원',
    phone: '01012341234',
    memberCount: 2,
    rating: 4,
    memo: '메모2',
  },
  {
    id: 3,
    name: '최직원',
    phone: '01012341234',
    memberCount: 1,
    rating: 5,
    memo: '메모3',
  },
];

const CreateStaff = () => {
  const [staffInput, setStaffInput] = useState('');
  const [staffs, setStaffs] = useState(staffDatas);

  const getValue = (event: any) => event.target.value;

  const searched = staffs.filter((item: any) => {
    return item.name.includes(staffInput);
  });
  return (
    <>
      <input type="text" onChange={getValue} />
      <h2>직원 리스트</h2>
      <ul>
        {searched.map((item: any) => (
          <li key={item.id} {...item}>
            <p>{item.id}</p>
            <p>{item.name}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CreateStaff;
