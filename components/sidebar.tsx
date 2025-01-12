'use client';
import React, { FC } from 'react';
import { SidebarProvider, SidebarTrigger } from './ui/sidebar';
import { AppSidebar } from './app-sidebar';
import { useRouter } from 'next/navigation';
import Loader from './loader';
import { useSession } from 'next-auth/react';

type TSidebarprop = {
  children: React.ReactNode;
};

const Sidebar: FC<TSidebarprop> = ({ children }) => {
  const session = useSession();
  const router = useRouter();

  if (session.status === 'authenticated') {
    return (
      <SidebarProvider>
        <div className='flex h-screen w-full'>
          <AppSidebar />
          <div className='w-full'>
            <div className='flex-1'>{children}</div>
          </div>
        </div>
      </SidebarProvider>
    );
  } else if (session.status == 'unauthenticated') {
    router.push('/login');
    return <Loader />;
  } else {
    return <Loader />;
  }
};

export default Sidebar;
