import React, { useEffect, useState } from 'react';

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
    const timer = setTimeout(() => {
      setMemberList(memberDatas);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {memberList &&
        memberList.map((member, index) => (
          <div key={member.id}>
            <p>ID: {member.id}</p>
            <p>Name: {member.name}</p>
            <p>Phone: {member.phone}</p>
            <p>Sex: {member.sex}</p>
            <p>Birth Date: {member.birthDate}</p>
            <p>Created At: {member.createdAt}</p>
            <p>Updated At: {member.updatedAt}</p>
            <p>Visited At: {member.visitedAt}</p>
          </div>
        ))}
    </div>
  );
}

export default Main;
