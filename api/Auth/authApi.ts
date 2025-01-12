'use client';
import axios from 'axios';
import { LoginFormInputs, SingupFormInputs } from '@/types/Auth/types';
import { BaseUrl } from '@/config';

export const handleLogin = async (data: LoginFormInputs) => {
  const response = await axios.post(`${BaseUrl}/auth/login`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  console.log(response.data);
  return response.data;
};

export const handleSignup = async (data: SingupFormInputs) => {
  const response = await axios.post(`${BaseUrl}/auth/signup`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  console.log(response.data);
  return response.data;
};
