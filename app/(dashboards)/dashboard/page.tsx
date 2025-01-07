'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Button } from '@/components/ui/button';
import { useSession, signOut } from 'next-auth/react';

const Page = () => {
  const router = useRouter();
  const {data: session, status} = useSession();
  
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);


  const sessiondata = session?.accessToken;
  console.log(sessiondata);

  console.log('status', status);


  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const initializeSession = async () => {
      if (status === 'authenticated' && session && typeof session.accessToken === 'string') {
        localStorage.setItem('accessToken', session.accessToken);
      } 
      if (accessToken) {
        router.push('/dashboard');
      }
      else if (status === 'unauthenticated' || !accessToken) {
        router.push('/login');
      } 
    };
  
    if (status !== 'loading') {
      initializeSession();
    }
  }, [session, status, router, accessToken]);



  const handleLogout = async () => {
    await signOut({ redirect: false });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    router.push('/login');
  };

 
  return (
    <div className='dashboard-area w-full bg-white px-4'>
      <div className='upper-area mt-0 flex justify-between'>
        <h1 className='mt-1 text-3xl font-bold lg:ml-5 lg:mt-1'>
          Dashboard Details
        </h1>
        <Button
          className='relative bottom-0 w-24 bg-red-500 text-white lg:bottom-0'
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Page;