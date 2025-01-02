'use client';
import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Eye, EyeSlash, Circle } from '@phosphor-icons/react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../../public/logos/Main-logo.svg';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { LoginSchema } from '@/schema/loginSchema';
import { LoginFormInputs } from '@/types/Auth/types';
import { Input } from '@/components/ui/input';
import GoogleButton from './_components/googleButton';
import OrDivider from './_components/orDivider';
import ErrorCard from './_components/errorCard';
import { useMutation } from '@tanstack/react-query';
import { handleLogin } from '@/api/Auth/authApi';
import { useDispatch } from 'react-redux';
import { setAuthData } from '@/redux/slices/authSlice';

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [errorFlag, setErrorFlag] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(LoginSchema),
  });

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const loginMutation = useMutation({
    mutationFn: handleLogin,
    onSuccess: (data) => {
      const { tokens, userInfo } = data;
      dispatch(setAuthData({ tokens, userInfo }));
      localStorage.setItem('accessToken', tokens.access_token);
      localStorage.setItem('refreshToken', tokens.refresh_token);
      router.push('/dashboard');
    },
    onError: () => {
      setErrorFlag(true);
    },
  });

  const handleSubmission: SubmitHandler<LoginFormInputs> = (data) => {
    loginMutation.mutate(data);
  };

  console.log('errors of login page', errors);

  return (
    <div className='mx-8 flex min-h-screen items-center justify-center bg-white'>
      <div className='w-full max-w-[384px] py-10'>
        <div className='mx-auto'>
          <div className='logo-area mb-2 flex justify-center'>
            <Image src={Logo} alt='Pattern50 Logo' />
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
                Continue with pattern50
              </p>
            </div>

            <ErrorCard 
            
            setErrorFlag={setErrorFlag}
            errorFlag={errorFlag}

            /> 

            <div className='flex flex-col gap-2'>
              <div className='mt-[32px]'>
                <label htmlFor='email' className='text-sm text-textSecondary'>
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
                        <Eye size={20} className='text-xl text-subHeading' />
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
              <div className='mb-[32px] mt-[16px] flex justify-end'>
                <Link
                  href='/forgotpassword'
                  className='text-forgotpassword px-2 text-sm text-textSecondary'
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <div>
              <Button variant={'primary'} size={'medium'} className='text-sm'>
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
  );
};

export default Login;