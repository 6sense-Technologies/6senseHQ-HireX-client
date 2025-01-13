import axios from 'axios';
import { LoginFormInputs, SingupFormInputs } from '@/types/Auth/types';
import { BaseUrl } from '@/config';

export const handleLogin = jest.fn(async (data: LoginFormInputs) => {
  const response = await axios.post(`${BaseUrl}/auth/login`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
});

export const handleSignup = jest.fn(async (data: SingupFormInputs) => {
  const response = await axios.post(`${BaseUrl}/auth/signup`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
});