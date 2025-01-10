'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Loader from '@/components/loader';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@radix-ui/react-separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Topbreadcrumb from '@/components/topbreadcrumb';

const Page = () => {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.status === 'authenticated' && session?.data?.accessToken) {
      localStorage.setItem('accessToken', session?.data?.accessToken);
    }
  }, [session.status, session?.data?.accessToken]);

  const formatName = (name: string) => {
    const nameParts = name.split(' ');
    const formattedNameParts = nameParts.map(
      (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
    );
    return formattedNameParts.join(' ');
  };

  const userName = session?.data?.user?.name
    ? formatName(session.data.user.name)
    : '';

  console.log(session);

  if (session.status === 'authenticated') {
    return (
      <>
        <Topbreadcrumb />
        <div className='dashboard-area w-full bg-white px-4'>
          <div className='upper-area mt-0 flex justify-between'>
            <h1 className='mt-1 text-3xl font-bold lg:ml-5 lg:mt-1'>
              Hi {userName}!
            </h1>
          </div>
        </div>
      </>
    );
  } else {
    router.push('/login');
    return <Loader />;
  }
};

export default Page;
