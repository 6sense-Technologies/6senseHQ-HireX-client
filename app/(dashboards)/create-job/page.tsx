'use client';
import { SignupSchema } from '@/schema/signupSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import JobInformation from './_components/jobInformation';
import JobResponsibilites from './_components/jobResponsibilites';
import IdealCandidates from './_components/idealCandidates';
import InterviewStage from './_components/interviewStage';
import { useQuery } from '@tanstack/react-query';
import { getDepartments, getJobpostion } from '@/api/Job/JobApi';

const CreateJob = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      roleNames: [],
    },
  });

  const accessToken = localStorage.getItem('accessToken');
  console.log(accessToken);

  const { data: jobpositions } = useQuery<any, any, any>({
    queryKey: ['jobpositions'],
    queryFn: () => getJobpostion(),
    enabled: true,
  });

  const { data: departments } = useQuery<any, any, any>({
    queryKey: ['departments'],
    queryFn: () => getDepartments(),
    enabled: true,
  });


  const jobPositionOptions =
  jobpositions?.map((jobpositions: {jobPositionName: string }) => ({
    value: jobpositions.jobPositionName,
    label: jobpositions.jobPositionName,
  })) || [];

  const departmentOptions =
  departments?.map((departments: {jobDepartmentName: string }) => ({
    value: departments.jobDepartmentName,
    label: departments.jobDepartmentName,
  })) || [];

  const handleSubmission: SubmitHandler<any> = (data) => {
    console.log(data);
  };

  return (
    <div className='bg-white px-[16px]'>
      <form className='pb-28'onSubmit={handleSubmit(handleSubmission)}>
        <div className='min-h-screen'>
          {/* Job Information Area*/}
          <JobInformation
            control={control}
            errors={errors}
            setValue={setValue}
            jobPositionOptions={jobPositionOptions}
            departmentOptions={departmentOptions}
          />

          {/* Interview Stage Area  */}
          <InterviewStage
            control={control}
            setValue={setValue}
            errors={errors}
          />

          {/* Job Responsibilites Area */}
          <JobResponsibilites />

          {/* Ideal Candidate Area */}
          <IdealCandidates />

          <div className='mt-[30px] flex justify-end gap-[16px]'>
            <Button variant='blackwhite' className='h-[40px] w-[80px]'>
              Cancel
            </Button>
            <Button variant='lightBlue' className='h-[40px] w-[80px]'>
              Create
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateJob;
