import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

interface Member {
  id: number;
  name: string;
  phone: string;
  sex: string;
  birthDate: string;
  createdAt: string;
  updatedAt: string;
  visitedAt: string;
}

const memberDatas: Member[] = [
  {
    id: 1,
    name: '김회원',
    phone: '01012341234',
    sex: 'MALE',
    birthDate: '2023-07-28',
    createdAt: '2023-07-28T07:38:08.832Z',
    updatedAt: '2023-07-28T07:38:08.832Z',
    visitedAt: '2023-07-28T07:38:08.832Z',
  },
  {
    id: 2,
    name: '박회원',
    phone: '01012341234',
    sex: 'FEMALE',
    birthDate: '2023-07-28',
    createdAt: '2023-07-28T07:38:08.832Z',
    updatedAt: '2023-07-28T07:38:08.832Z',
    visitedAt: '2023-07-28T07:38:08.832Z',
  },
  {
    id: 3,
    name: '최회원',
    phone: '01012341234',
    sex: 'FEMALE',
    birthDate: '2023-07-28',
    createdAt: '2023-07-28T07:38:08.832Z',
    updatedAt: '2023-07-28T07:38:08.832Z',
    visitedAt: '2023-07-28T07:38:08.832Z',
  },
];

const SearchMembers = () => {
  // input에 입력된 문자열 state
  const [memberInput, setMemberInput] = useState('');
  // 검색된 결과를 담을 state
  const [members, setMembers] = useState(memberDatas);

  // TODO: axios get 요청으로 회원 데이터 수신
  useEffect(() => {
    axios.get('');
  }, []);

  // 이전 페이지로
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  const getValue = (event: any) => event.target.value;

  const searched = members.filter((item: any) => {
    return item.name.includes(memberInput);
  });

  return (
    <>
      <h1>회원 검색 페이지</h1>
      <header className="flex justify-between py-3 mb-2 text-xl font-bold border-b-2 border-gray-300">
        <div className="flex">
          <button onClick={handleBackClick} type="submit" className="focus:outline-none">
            <svg
              className="mr-2"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none">
              <path
                d="M16.7071 3.29289C17.0976 3.68342 17.0976 4.31658 16.7071 4.70711L9.41421 12L16.7071 19.2929C17.0976 19.6834 17.0976 20.3166 16.7071 20.7071C16.3166 21.0976 15.6834 21.0976 15.2929 20.7071L7.29289 12.7071C6.90237 12.3166 6.90237 11.6834 7.29289 11.2929L15.2929 3.29289C15.6834 2.90237 16.3166 2.90237 16.7071 3.29289Z"
                fill="#505050"
              />
            </svg>
          </button>
          <input type="text" className="" onChange={getValue} placeholder="검색어를 입력해주세요" />
        </div>
      </header>
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

export default SearchMembers;
