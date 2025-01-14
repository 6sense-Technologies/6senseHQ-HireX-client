'use client';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Eye, EyeSlash, Circle } from '@phosphor-icons/react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../../public/logos/HireXLogo.png';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '@/Zodschema/authSchema';
import { LoginFormInputs } from '@/types/Auth/types';
import { Input } from '@/components/ui/input';
import GoogleButton from './_components/googleButton';
import OrDivider from './_components/orDivider';
import ErrorCard from './_components/errorCard';
import { useMutation } from '@tanstack/react-query';
import Loader from '@/components/loader';
import { signIn, useSession } from 'next-auth/react';
import Head from 'next/head';

const Login =  () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();
  const [errorFlag, setErrorFlag] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(LoginSchema),
  });

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const session = useSession();

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormInputs) => {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      
      // console.log("🚀 ~ mutationFn: ~ result:", result?.code)
      if (result?.code) {
        throw new Error(result.code);
      }
      return result;
    },
    onSuccess: () => {
      localStorage.setItem('logout', 'false');
      router.push('/dashboard');
    },
    onError: (error:any) => {
      console.log('Error:', error.message);
      setErrorFlag(true);
      setErrorMessage(error.message);
    },
  });

  const handleSubmission: SubmitHandler<LoginFormInputs> = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => console.log('login Mutation data', data),
    });
  };

  useEffect(() => {
    document.title = 'HireX - Signin ';
  }, []);

  const email = watch('email');
  const password = watch('password');
  const isFormValid = email && password;

  if (session.status !== 'unauthenticated') {
    router.push('/dashboard');
    return <Loader />;
  }
    return (
      <>
        <Head>
          <title>{document.title}</title>
          <meta name='description' content='HireX Signin' />
        </Head>
        <div className='mx-8 flex min-h-screen items-center justify-center bg-white'>
          <div className='w-full max-w-[384px] py-10'>
            <div className='mx-auto'>
              <div className='logo-area mb-2 flex justify-center'>
                <Image src={Logo} alt='HireX Logo' />
              </div>
              <form
                onSubmit={handleSubmit(handleSubmission)}
                className='max-w-[384px] border-t-[4px] border-primary bg-pageBg p-[32px]'
              >
                <div>
                  <h1 className='text-headingXS font-bold text-textPrimary'>
                    Login
                  </h1>
                  <p className='text-[14px] text-subHeading'>
                    Continue with HireX
                  </p>
                </div>

                <ErrorCard 
                errorMessage={errorMessage}
                setErrorFlag={setErrorFlag} errorFlag={errorFlag} />

                <div className='flex flex-col gap-2'>
                  <div className='mt-[32px]'>
                    <label
                      htmlFor='email'
                      className='text-sm text-textSecondary'
                    >
                      Email Address
                    </label>
                    <div className='inner-input-div mt-[4px]'>
                      <Input
                        control={control}
                        placeholder='Email Address'
                        name='email'
                        errors={errors}
                      />
                    </div>
                  </div>

                  <div className='mt-[16px]'>
                    <label
                      htmlFor='password'
                      className='text-sm text-textSecondary'
                    >
                      Password
                    </label>

                    <div className='relative'>
                      <div className='mt-[4px]'>
                        <Input
                          control={control}
                          type={passwordVisible ? 'text' : 'password'}
                          name='password'
                          placeholder='Password'
                          errors={errors}
                        />
                        <button
                          type='button'
                          onClick={handlePasswordVisibility}
                          className='absolute right-5 top-2.5'
                        >
                          {passwordVisible ? (
                            <Eye
                              size={20}
                              className='text-xl text-subHeading'
                            />
                          ) : (
                            <EyeSlash
                              size={20}
                              weight='bold'
                              className='text-xl text-subHeading'
                            />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className='mb-[10px] mt-[16px] flex justify-end'>
                    <Link
                      href='/forgotpassword'
                      className='text-forgotpassword px-2 text-sm text-textSecondary'
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className='mb-[18px] flex justify-end'>
                  Don't have an account?
                  <Link
                    href='/signup'
                    className='text-forgotpassword text-primar px-1 py-[3px] text-sm'
                  >
                    <span className='text-blue-600 hover:underline'>
                      Signup
                    </span>
                  </Link>
                </div>
                <div>
                  <Button
                    variant={'primary'}
                    size={'medium'}
                    className='text-sm'
                    disabled={!isFormValid}
                  >
                    {loginMutation.isPending ? (
                      <Circle className='animate-spin text-sm' />
                    ) : (
                      'Login'
                    )}
                  </Button>
                </div>

                <OrDivider />

                <GoogleButton />
              </form>
            </div>
          </div>
        </div>
      </>
    );
};

export default Login;