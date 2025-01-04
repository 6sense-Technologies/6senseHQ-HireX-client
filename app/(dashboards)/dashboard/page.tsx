'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Button } from '@/components/ui/button';

const Page = () => {
  const router = useRouter();

  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const tokens = useSelector((state: RootState) => state.auth.tokens);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        router.push('/login');
      }
    };

    checkToken();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'accessToken') {
        checkToken();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [router]);

  const handleLogout = () => {
    router.push('/login');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  console.log('Checking Redux Working or not ', userInfo);

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
