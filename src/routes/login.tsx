import React, { useState } from 'react';
import axios from 'axios';
import { useMutation } from 'react-query';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

interface LoginInfo {
  username: string;
  password: string;
  centerCode: string;
  isAdmin: boolean;
}

function Login() {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    username: '',
    password: '',
    centerCode: '',
    isAdmin: false,
  });

  const mutation = useMutation((info: LoginInfo) => {
    const apiUrl = info.isAdmin
      ? `http://223.130.161.221/api/v1/staffs/login?centerCode=${info.centerCode}`
      : `http://223.130.161.221/api/v1/admins/login`;

    return axios.post(apiUrl, {
      username: info.username,
      password: info.password,
    });
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(loginInfo);
  };

  return (
    <div>
      <Tabs>
        <TabList>
          <Tab>User Login</Tab>
          <Tab>Admin Login</Tab>
        </TabList>

        <TabPanel>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              Username:
              <input type="text" name="username" onChange={handleInputChange} />
            </label>
            <label htmlFor="password">
              Password:
              <input type="password" name="password" onChange={handleInputChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </TabPanel>

        <TabPanel>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              Username:
              <input type="text" name="username" onChange={handleInputChange} />
            </label>
            <label htmlFor="password">
              Password:
              <input type="password" name="password" onChange={handleInputChange} />
            </label>
            <label htmlFor="centerCode">
              Center Code:
              <input type="text" name="centerCode" onChange={handleInputChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default Login;
