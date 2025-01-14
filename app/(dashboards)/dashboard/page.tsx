'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Loader from '@/components/loader';
import Topbreadcrumb from '@/components/topbreadcrumb';
import Head from 'next/head';

const Page = () => {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.status === 'authenticated' && session?.data?.accessToken && session?.data?.refreshToken) {
      localStorage.setItem('accessToken', session?.data?.accessToken);
      localStorage.setItem('refreshToken', session?.data?.refreshToken);
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

  useEffect(() => {
    document.title = 'HireX - Dashboard ';
  }, []);

  if (session.status !== 'authenticated') {
    router.push('/login');
    return <Loader />;
  }
    return (
      <>
        <Topbreadcrumb initialData='Dashboard' initalLink='/dashboard' />
        <Head>
          <title>{document.title}</title>
          <meta name='description' content='HireX dashboard' />
        </Head>
        <div className='dashboard-area w-full bg-white px-4'>
          <div className='upper-area mt-0 flex justify-between'>
            <h1 className='mt-1 text-3xl font-bold lg:ml-5 lg:mt-1'>
              Hi {userName}!
            </h1>
          </div>
        </div>
      </>
    );
};

export default Page;
