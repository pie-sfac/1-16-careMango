/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';

type UserLoginData = {
  username: string;
  password: string;
};

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState<UserLoginData>({ username: '', password: '' });

  const loginMutation = useMutation((loginData: UserLoginData) =>
    axios.post('http://223.130.161.221/api/v1/admins/login', loginData),
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await loginMutation.mutateAsync(loginData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label htmlFor="username">
        Username:
        <input type="text" name="username" onChange={handleInputChange} />
      </label>
      <label htmlFor="password">
        Password:
        <input type="password" name="password" onChange={handleInputChange} />
      </label>
      <input type="submit" value="Login" />
    </form>
  );
};

export default Login;
