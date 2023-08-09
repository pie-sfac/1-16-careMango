import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../utils/apiInstance';

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

  if (!user) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="mt-6 text-center">
        <h2 className="text-2xl font-semibold">{user.name}</h2>
        <p className="text-gray-500">{user.loginId}</p>
        <p className="text-gray-500">{user.phone}</p>
        {/* 필요한 정보를 여기에 추가하세요 */}
      </div>
    </div>
  );
};

export default MyPage;
