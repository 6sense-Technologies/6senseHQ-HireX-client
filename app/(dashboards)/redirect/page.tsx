'use client';
import React from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Loader from '@/components/loader';

const Page = () => {

    const {data: session, status} = useSession();

    

    const Router = useRouter();
    if(status == 'authenticated' && session){
    
        if (session.accessToken) {
            localStorage.setItem('accessToken', session.accessToken);
            Router.push('/dashboard');
            return <Loader/>
        }
        else
        {
            Router.push('/login');
        }

    }

  return (
    <div>
      <Loader/>
    </div>
  )
}

export default Page
