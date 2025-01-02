'use client';
import Dropdown from '@/components/dropdown';
import TextArea from '@/components/textArea';
import { Input } from '@/components/ui/input';
import { SignupSchema } from '@/schema/signupSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { DropDownMenu } from './_components/dropdownmenu';

const CreateJob = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      roleNames: [],
    },
  });

  const roleOptions = [
    { value: 'interviewer', label: 'Interviewer' },
    { value: 'hr', label: 'HR' },
    { value: 'admin', label: 'Admin' },
  ];

  const handleSubmission: SubmitHandler<any> = (data) => {
    console.log(data);
  };

  return (
    <div className='bg-white px-[16px]'>
      <form>
        <div className='min-h-screen'>
          {/* Job Information Area*/}
          <div className='max-w-[1168px] rounded-2xl bg-jobBg'>
            <div>
              <h1 className='pl-[48px] pt-[32px] text-headingXXS font-semibold'>
                Job information
              </h1>
            </div>

            <div className='flex gap-[24px] pb-[32px] pl-[48px] pr-[96px] pt-[16px]'>
              <div className='w-full'>
                <label
                  htmlFor='role'
                  className='text-dropdownLabelColor text-nowrap text-twelve font-medium'
                >
                  Job Position
                </label>
                <div>
                  <Dropdown
                    control={control}
                    name='jobposition'
                    errors={errors}
                    setValue={setValue}
                    options={roleOptions}
                    placeholder='Select...'
                    ClassName='mt-[8px] max-w-[348px] placeholder:text-placholderColor'
                  />
                </div>
              </div>
              <div className='w-full'>
                <label
                  htmlFor='role'
                  className='text-dropdownLabelColor text-nowrap text-twelve font-medium'
                >
                  Department (Optional)
                </label>
                <div>
                  <Dropdown
                    control={control}
                    name='department'
                    errors={errors}
                    setValue={setValue}
                    options={roleOptions}
                    placeholder='Select...'
                    ClassName='mt-[8px] max-w-[348px] placeholder:text-placholderColor'
                  />
                </div>
              </div>

              <div className='w-full'>
                <label
                  htmlFor='vacancy'
                  className='text-dropdownLabelColor text-nowrap text-twelve font-medium'
                >
                  No of Vacancy
                </label>
                <div>
                  <Input
                    control={control}
                    placeholder='No of Vacancy'
                    name='email'
                    errors={errors}
                    className='placeholder:text-placholderColor mt-[8px] max-w-[348px] bg-white'
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Interview Stage Area  */}
          <div className='max-w-[1168px] rounded-2xl bg-jobBg mt-[32px]'>
            <div>
              <h1 className='pl-[48px] pt-[38px] text-headingXXS font-semibold'>
                  Interview Stages
              </h1>
            </div>
          </div>

          {/* Job Responsibilites Area */}
          <div className='max-w-[1168px] rounded-2xl bg-jobBg mt-[32px]'>
            <div>
              <h1 className='pl-[48px] pt-[38px] text-headingXXS font-semibold'>
                  Job Responsibilities
              </h1>
            </div>
            <div className='w-full pl-[47px] pr-[38px] pb-[38px]'>
              <TextArea
              name='jobResponsibilities'
              placeholder='Type Job Responsibilities'
              className='placeholder:text-placeholderColor bg-transparent px-[12px] pt-[10px] max-w-[1082px] h-[207px] mt-[16px]'

              />
            </div>
          </div>

          {/* Ideal Candidate Area */}
          <div className='max-w-[1168px] rounded-2xl bg-jobBg mt-[32px]'>
            <div>
              <h1 className='pl-[48px] pt-[38px] text-headingXXS font-semibold'>
                  Idea Candidate
              </h1>
            </div>
            <div className='w-full pl-[47px] pr-[38px] pb-[38px]'>
              <DropDownMenu />
            </div>
          </div>

        </div>
      </form>
    </div>
  );
};

export default CreateJob;
