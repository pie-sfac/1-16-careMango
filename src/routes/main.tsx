import { useEffect, useState } from 'react';
import { sleep } from 'react-query/types/core/utils';

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
];

function Main() {
  const [memberList, setMemberList] = useState<Member[] | null>(null);

  useEffect(() => {
    sleep(1000);
    setMemberList(memberDatas);
    return () => {};
  }, []);

  return memberList && memberList.map();
}

export default Main;
