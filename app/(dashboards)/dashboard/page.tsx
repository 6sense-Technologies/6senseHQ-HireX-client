'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useSession, signOut } from 'next-auth/react';
import Loader from '@/components/loader';

const Page = () => {
  const router = useRouter();
  const session = useSession();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  // if (session.status === 'authenticated') {
  //   localStorage.setItem('accessToken', session?.data?.accessToken as string);
  // }

  if (session.status === 'authenticated') {
    return (
      <div className='dashboard-area w-full bg-white px-4'>
        <div className='upper-area mt-0 flex justify-between'>
          <h1 className='mt-1 text-3xl font-bold lg:ml-5 lg:mt-1'>
            Dashboard Details {session.data.user?.email}
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
  } else {
    router.push('/login');
    return <Loader />;
  }
};

export default Page;
