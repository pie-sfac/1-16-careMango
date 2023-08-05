import React, { useState } from 'react';
import axios from 'axios';
import { useMutation } from 'react-query';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useNavigate } from 'react-router-dom';
import { SetterOrUpdater } from 'recoil';

import '../index.css';

interface LoginInfo {
  username: string;
  password: string;
  centerCode: string;
  isAdmin: boolean;
}

interface LoginProps {
  setAccessToken: SetterOrUpdater<string>;
}

function Login({ setAccessToken }: LoginProps) {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    username: '',
    password: '',
    centerCode: '',
    isAdmin: false,
  });

  const navigate = useNavigate();

  const mutation = useMutation((info: LoginInfo) => {
    const apiUrl = info.isAdmin
      ? `${import.meta.env.VITE_API_URL}/staffs/login?centerCode=${info.centerCode}`
      : `${import.meta.env.VITE_API_URL}/admins/login`;
    const encodedString = btoa(`${info.username}:${info.password}`);
    return axios
      .post(
        apiUrl,
        {},
        {
          headers: { Authorization: `Basic ${encodedString}` },
        },
      )
      .then((res) => {
        // console.log(res.data.accessToken);
        // console.log(res.headers.message);
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        setAccessToken(res.data.accessToken);
      })
      .catch((err) => err);
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(loginInfo);
  };

  return (
    <div className="w-full max-w-xs mx-auto mt-20">
      <Tabs>
        <TabList className="flex w-2/4 mb-3">
          <Tab className="flex-1 py-2 text-sm text-center border-b-4 cursor-pointer focus:outline-none focus:shadow-outline focus:text-blue-500 focus:border-blue-500">
            User Login
          </Tab>
          <Tab className="flex-1 py-2 text-sm text-center border-b-4 cursor-pointer focus:outline-none focus:shadow-outline focus:text-blue-500 focus:border-blue-500">
            Admin Login
          </Tab>
        </TabList>

        <TabPanel>
          <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
            <div className="mb-4">
              <label htmlFor="username" className="block mb-2 text-sm font-bold text-gray-700">
                Username:
                <input
                  type="text"
                  name="username"
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
              </label>
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-700">
                Password:
                <input
                  type="password"
                  name="password"
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
              </label>
            </div>
            <div className="flex items-center justify-between">
              <input
                type="submit"
                value="Submit"
                className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              />
            </div>
          </form>
        </TabPanel>

        <TabPanel>
          <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
            <div className="mb-4">
              <label htmlFor="username" className="block mb-2 text-sm font-bold text-gray-700">
                Username:
                <input
                  type="text"
                  name="username"
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
              </label>
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-700">
                Password:
                <input
                  type="password"
                  name="password"
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
              </label>
            </div>
            <div className="mb-6">
              <label htmlFor="centerCode" className="block mb-2 text-sm font-bold text-gray-700">
                Center Code:
                <input
                  type="text"
                  name="centerCode"
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
              </label>
            </div>
            <div className="flex items-center justify-between">
              <input
                type="submit"
                value="Submit"
                className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              />
            </div>
          </form>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default Login;
