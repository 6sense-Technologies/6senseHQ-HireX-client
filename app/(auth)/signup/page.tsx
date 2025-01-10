'use client';
import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Circle, Eye, EyeSlash, X } from '@phosphor-icons/react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../../public/logos/HireXLogo.png';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SignupSchema } from '@/Zodschema/authSchema';
import { SingupFormInputs } from '@/types/Auth/types';
import Dropdown from '@/components/dropdown';
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import { handleSignup } from '@/api/Auth/authApi';
import { useSession } from 'next-auth/react';
import Loader from '@/components/loader';

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [cPasswordVisible, setCPasswordVisible] = useState(false);

  const router = useRouter();
  const session = useSession();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<SingupFormInputs>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      roleNames: [],
    },
  });

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleConfirmPasswordVisibility = () => {
    setCPasswordVisible(!cPasswordVisible);
  };

  const roleOptions = [
    { value: 'interviewer', label: 'Interviewer' },
    { value: 'hr', label: 'HR' },
    { value: 'admin', label: 'Admin' },
  ];

  const signupMutation = useMutation({
    mutationFn: handleSignup,
    onSuccess: () => {
      router.push('/login');
    },
  });

  const handleSubmission: SubmitHandler<SingupFormInputs> = (data) => {
    const { Cpassword, ...rest } = data;
    rest.roleNames = Array.isArray(rest.roleNames)
      ? rest.roleNames
      : [rest.roleNames];

    signupMutation.mutate(rest);
  };

  console.log(errors);

  if (session.status === 'unauthenticated') {
    return (
      <div className='mx-8 flex min-h-screen items-center justify-center bg-white'>
        <div className='w-full max-w-[384px] py-10'>
          <div className='mx-auto'>
            <div className='logo-area mb-2 flex justify-center'>
              <Link href='/login'>
                <Image src={Logo} alt='HireX Logo' />
              </Link>
            </div>
            <form
              onSubmit={handleSubmit(handleSubmission)}
              className='max-w-[384px] border-t-[4px] border-primary bg-pageBg p-[32px]'
            >
              <div>
                <h1 className='text-headingXS font-bold text-textPrimary'>
                  Signup
                </h1>
                <p className='text-[14px] text-subHeading'>Create an account</p>
              </div>

              {/* <ErrorCard /> */}

              <div className='flex flex-col gap-2'>
                <div className='mt-[32px]'>
                  <label
                    htmlFor='fullname'
                    className='text-sm text-textSecondary'
                  >
                    Full Name
                  </label>
                  <div className='inner-input-div mt-[4px]'>
                    <Input
                      control={control}
                      placeholder='Full Name'
                      name='name'
                      errors={errors}
                    />
                  </div>
                </div>
                <div className='mt-[6px]'>
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

                <div className='mt-[6px]'>
                  <label
                    htmlFor='password'
                    className='text-sm text-textSecondary'
                  >
                    Password
                  </label>
                  <p className='my-1 text-twelve text-subHeading'>
                    Password must be 8 characters with symbols, numbers, upper &
                    lower case, no spaces.
                  </p>

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

                <div className='mt-[6px]'>
                  <label
                    htmlFor='Cpassword'
                    className='text-sm text-textSecondary'
                  >
                    Confirm Password
                  </label>

                  <div className='relative'>
                    <div className='mt-[4px]'>
                      <Input
                        control={control}
                        type={cPasswordVisible ? 'text' : 'password'}
                        name='Cpassword'
                        placeholder='Confirm Password'
                        errors={errors}
                      />
                      <button
                        type='button'
                        onClick={handleConfirmPasswordVisibility}
                        className='absolute right-5 top-2.5'
                      >
                        {cPasswordVisible ? (
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

                <div className='mt-[6px]'>
                  <label htmlFor='role' className='text-sm text-textSecondary'>
                    Role
                  </label>

                  <Dropdown
                    control={control}
                    name='roleNames'
                    errors={errors}
                    setValue={setValue}
                    options={roleOptions}
                    placeholder='Select a role'
                    ClassName='mt-[4px]'
                  />
                </div>

                <div className='mb-[32px] mt-[16px] flex justify-end'>
                  <Link
                    href='/login'
                    className='text-primar px-2 text-sm text-subHeading'
                  >
                    Have an account?{' '}
                    <span className='text-blue-600 hover:underline'>Login</span>
                  </Link>
                </div>
              </div>

              <div>
                <Button variant={'primary'} size={'medium'} className='text-sm'>
                  {signupMutation.isPending ? (
                    <Circle className='animate-spin text-sm' />
                  ) : (
                    'Sign Up'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    router.push('/dashboard');
    return <Loader />;
  }
};

export default Signup;
