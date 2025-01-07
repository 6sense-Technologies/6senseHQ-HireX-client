'use client';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import JobInformation from './_components/jobInformation';
import JobResponsibilites from './_components/jobResponsibilites';
import IdealCandidates from './_components/idealCandidates';
import InterviewStage from './_components/interviewStage';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getDepartments,
  getJobpostion,
  handleCreateJob,
} from '@/api/Job/JobApi';
import { useRouter } from 'next/navigation';
import { JobDepartmentList, JobPositionList } from '@/types/Job/type';
import { useSession } from 'next-auth/react';
import Loader from '@/components/loader';

const CreateJob = () => {
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      interviewStages: [],
    },
  });

  const router = useRouter();
  // const session = useSession();

  const { data: jobpositions } = useQuery<
    JobPositionList,
    any,
    JobPositionList
  >({
    queryKey: ['jobpositions'],
    queryFn: () => getJobpostion(),
    enabled: true,
  });

  const { data: departments } = useQuery<
    JobDepartmentList,
    any,
    JobDepartmentList
  >({
    queryKey: ['departments'],
    queryFn: () => getDepartments(),
    enabled: true,
  });

  const jobPositionOptions =
    jobpositions?.map((jobpositions: { jobPositionName: string }) => ({
      value: jobpositions.jobPositionName,
      label: jobpositions.jobPositionName,
    })) || [];

  const departmentOptions =
    departments?.map((departments: { jobDepartmentName: string }) => ({
      value: departments.jobDepartmentName,
      label: departments.jobDepartmentName,
    })) || [];

  const createJobMutation = useMutation({
    mutationFn: handleCreateJob,
    onSuccess: () => {
      router.push('/dashboard');
    },
  });

  const handleSubmission: SubmitHandler<any> = (data) => {
    const { interviewMedium, ...filteredData } = data;

    createJobMutation.mutate(filteredData);
  };

  return (
    <div className='bg-white px-[16px]'>
      <form className='pb-28' onSubmit={handleSubmit(handleSubmission)}>
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
          <JobResponsibilites control={control} errors={errors} />

          {/* Ideal Candidate Area */}
          <IdealCandidates control={control} errors={errors} />

          <div className='mt-[30px] flex justify-end gap-[16px]'>
            <Button
              variant='blackwhite'
              className='h-[40px] w-[80px]'
              onClick={() => router.push('/dashboard')}
            >
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
