'use client';
import React, { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { handleGoogleLogin } from '@/api/Auth/authApi';
import { useMutation } from '@tanstack/react-query';

const GoogleAuthCallback = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const hasMutated = useRef(false);

  const code = searchParams.get('code');

  const googleLoginMutation = useMutation({
    mutationFn: handleGoogleLogin,
    onSuccess: () => {
      router.push('/dashboard');
    },
    onError: (error) => {
      console.log('Login failed:', error);
    },
  });

  useEffect(() => {
    if (code && !hasMutated.current) {
      googleLoginMutation.mutate({
        provider: 'google',
        authCode: code,
      });
      hasMutated.current = true;
    }
  }, [code]);

  return (
    <div className='px-10'>
      <div className='h-screen w-full bg-white'>
        <h1 className='pl-3 pt-3 text-2xl text-black'>Processing...</h1>
      </div>
    </div>
  );
};

export default GoogleAuthCallback;