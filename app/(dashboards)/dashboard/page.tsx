'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';

const Page = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [sessionInitialized, setSessionInitialized] = useState(false);

  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  console.log(userInfo);

  useEffect(() => {
    const initializeSession = async () => {
      if (status === 'authenticated' && session?.accessToken) {
        localStorage.setItem('accessToken', session.accessToken);
        setSessionInitialized(true);
      } else if (status === 'unauthenticated') {
        router.push('/login');
      }
    };

    if (status !== 'loading') {
      initializeSession();
    }
  }, [session, status, router]);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        router.push('/login');
      }
    };

    if (sessionInitialized) {
      checkToken();
    }

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'accessToken') {
        checkToken();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [router, sessionInitialized]);

  const handleLogout = () => {
    router.push('/login');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  if (status === 'loading' || !sessionInitialized) {
    return <div>Loading...</div>;
  }

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
