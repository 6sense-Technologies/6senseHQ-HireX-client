'use client';
import React, { FC } from 'react';
import { SidebarProvider, SidebarTrigger } from './ui/sidebar';
import { AppSidebar } from './app-sidebar';
import { Separator } from './ui/separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb';
import { useRouter } from 'next/navigation';
import Loader from './loader';
import { useSession } from 'next-auth/react';


type TSidebarprop = {
  children: React.ReactNode;
};

const Sidebar: FC<TSidebarprop> = ({ children }) => {
  const router = useRouter();

  const { data: session, status } = useSession();

  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    router.push('/login');
    return <Loader />;
  }

  console.log(session);


  return (
    <SidebarProvider>
      <div className='flex h-screen w-full'>
        <AppSidebar />
        <div className='w-full'>
          <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
            <div className='flex items-center gap-2 px-4'>
              <SidebarTrigger className='-ml-1' />
              <Separator orientation='vertical' className='mr-2 h-4' />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className='hidden md:block'>
                    <BreadcrumbLink href='#'>
                      Building Your Application
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className='hidden md:block' />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className='flex-1'>{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Sidebar;
