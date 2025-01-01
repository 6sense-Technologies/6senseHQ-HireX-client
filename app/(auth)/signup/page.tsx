'use client';
import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Eye, EyeSlash, X } from '@phosphor-icons/react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../../public/logos/Main-logo.svg';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SignupSchema } from '@/schema/signupSchema';
import { SingupFormInputs } from '@/types/Auth/types';
import Dropdown from '@/components/dropdown';
import { Input } from '@/components/ui/input';

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [cPasswordVisible, setCPasswordVisible] = useState(false);

  const router = useRouter();

  const clientId = '66227855cfd86a416d9ad70e';
  const secretId = 'e6e01bb8-cf88-495f-825b-2581210e9c4b';
  const base64Credentials = btoa(`${clientId}:${secretId}`);

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

  const handleSubmission: SubmitHandler<SingupFormInputs> = (data) => {
    console.log(data);
    const { Cpassword, ...rest} = data;
    rest.roleNames = Array.isArray(rest.roleNames) ? rest.roleNames : [rest.roleNames];
    console.log(rest);
  };

  console.log(errors);

  return (
    <div className='mx-8 flex min-h-screen items-center justify-center bg-white'>
      <div className='w-full max-w-[384px] py-10'>
        <div className='mx-auto'>
          <div className='logo-area mb-2 flex justify-center'>
            <Image src={Logo} alt='Pattern50 Logo' />
          </div>
          <form
            onSubmit={handleSubmit(handleSubmission)}
            className='bg-pageBg max-w-[384px] border-t-[4px] border-primary p-[32px]'
          >
            <div>
              <h1 className='text-headingXS text-textPrimary font-bold'>
                Signup
              </h1>
              <p className='text-subHeading text-[14px]'>Create an account</p>
            </div>

            {/* <ErrorCard /> */}

            <div className='flex flex-col gap-2'>
              <div className='mt-[32px]'>
                <label htmlFor='fullname' className='text-textSecondary text-sm'>
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
                <label htmlFor='email' className='text-textSecondary text-sm'>
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
                  className='text-textSecondary text-sm'
                >
                  Password
                </label>
                <p className='text-twelve text-subHeading my-1'>
                  Password must be 8 characters with symbols, numbers, upper & lower case, no spaces.
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
                        <Eye size={20} className='text-subHeading text-xl' />
                      ) : (
                        <EyeSlash
                          size={20}
                          weight='bold'
                          className='text-subHeading text-xl'
                        />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className='mt-[6px]'>
                <label
                  htmlFor='Cpassword'
                  className='text-textSecondary text-sm'
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
                        <Eye size={20} className='text-subHeading text-xl' />
                      ) : (
                        <EyeSlash
                          size={20}
                          weight='bold'
                          className='text-subHeading text-xl'
                        />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className='mt-[6px]'>
                <label
                  htmlFor='role'
                  className='text-textSecondary text-sm'
                >
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
                  className='text-forgotpassword text-primar px-2 text-sm'
                >
                  have a account? Login
                </Link>
              </div>
            </div>

            <div>
              <Button variant={'primary'} size={'medium'} className='text-sm'>
                Sign Up
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
