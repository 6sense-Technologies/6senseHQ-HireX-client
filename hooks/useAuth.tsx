import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Loader from '@/components/loader';

const useAuth = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken && status !== 'loading') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <Loader />;
  }

  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    return <Loader />;
  }

  return session;
};

export default useAuth;
