'use client';
import axios from 'axios';
import { LoginFormInputs, SingupFormInputs } from '@/types/Auth/types';
import { setAuthData } from '@/redux/slices/authSlice';
import { useDispatch } from 'react-redux';

export const handleLogin = async (data: LoginFormInputs) => {
  const response = await axios.post(
    'http://192.168.0.158:8000/auth/login',
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  console.log(response.data);
  return response.data;
};

export const handleSignup = async (data: SingupFormInputs) => {
  const response = await axios.post(
    'http://192.168.0.158:8000/auth/signup',
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  console.log(response.data);
  return response.data;
};
