'use client';
import axios from 'axios';
import {
  GoogleAuthTypes,
  LoginFormInputs,
  SingupFormInputs,
} from '@/types/Auth/types';
import { setAuthData } from '@/redux/slices/authSlice';
import { useDispatch } from 'react-redux';

export const handleLogin = async (data: LoginFormInputs) => {
  const response = await axios.post('http://localhost:8000/auth/login', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  console.log(response.data);
  return response.data;
};

export const handleSignup = async (data: SingupFormInputs) => {
  const response = await axios.post('http://localhost:8000/auth/signup', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  console.log(response.data);
  return response.data;
};

export const handleGoogleLogin = async (data: GoogleAuthTypes) => {
  console.log(Date.now());

  const response = await axios.post(
    'http://localhost:8000/auth/social-login',
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
