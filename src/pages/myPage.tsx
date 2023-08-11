import React, { useEffect, useState } from 'react';
import { axiosInstance } from '@/utils/apiInstance';
import { ReactComponent as ProfileEdit } from '@/assets/icons/ProfileEdit.svg';

interface Role {
  id: number;
  name: string;
}

interface TOS {
  id: number;
  title: string;
  content: string;
  required: boolean;
}

interface Center {
  id: number;
  name: string;
  code: string;
  phone: string;
}

interface User {
  id: number;
  type: string;
  loginId: string;
  name: string;
  phone: string;
  active: boolean;
  pwdChangeRequired: boolean;
  roles: Role[];
  permissions: string[];
  agreeTosRequired: boolean;
  toss: TOS[];
  hashKey: string;
  center: Center;
  message: string;
}

const MyPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    axiosInstance
      .get<User>('/me')
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, []);
  console.log(user);

  if (!user) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="p-6">
      <section className="flex items-center justify-between p-4 border-2 rounded-xl mt-5">
        <div className="flex items-center">
          <ProfileEdit />
          <p className="ml-5 text-primary-500 font-extrabold text-xl">{user.name}</p>
          {user.roles.map((role) => (
            <p key={role.id}>{role.name}</p>
          ))}
          <p className="bg-bg-100 mx-3 p-1 text-xs text-primary-500 rounded-xl">{user.type}</p>
          <p className="ml-2 font-bold text-text-700">{user.center.name}</p>
        </div>
        <div className="flex">
          <p>센터코드</p>
          <p className="ml-2 text-primary-500 font-bold">{user.center.code}</p>
        </div>
      </section>
      <section className="flex flex-col justify-between p-5 mt-5 border-2 rounded-xl">
        <div className="w-full flex justify-between items-center mb-5">
          <div className="font-extrabold text-lg text-text-700">내 정보</div>
          <button className="border-2 rounded-xl p-1 text-xs font-bold text-text-400">내 정보 수정</button>
        </div>
        <div className="flex">
          <ul className="mr-8">
            <li className="my-1 font-bold text-text-400">이름</li>
            <li className="my-1 font-bold text-text-400">휴대폰 번호</li>
            <li className="my-1 font-bold text-text-400">아이디</li>
          </ul>
          <ul>
            <li className="my-1 font-bold">{user.name}</li>
            <li className="my-1 font-bold">{user.phone}</li>
            <li className="my-1 font-bold">{user.id}</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default MyPage;
