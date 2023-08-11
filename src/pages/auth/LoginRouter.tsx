import React from 'react';
import { Outlet } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Login from '@pages/auth/login';
import { accessTokenState } from '@/atoms/token/accessTokenAtom';

const LoginRouter = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  return accessToken ? <Outlet /> : <Login setAccessToken={setAccessToken} />;
};
export default LoginRouter;
