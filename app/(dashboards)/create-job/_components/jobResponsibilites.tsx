import TextArea from '@/components/textArea';
import React from 'react';
import { Controller } from 'react-hook-form';

interface JobResponsibilitesProps {
  control: any;
  errors: any;
}

const JobResponsibilites: React.FC<JobResponsibilitesProps> = ({
  control,
  errors,
}) => {
  return (
    <div className='mt-[32px] max-w-[1168px] rounded-2xl bg-jobBg'>
      <div>
        <h1 className='pl-[48px] pt-[38px] text-headingXXS font-semibold'>
          Job Responsibilities
        </h1>
      </div>
      <div className='w-full pb-[38px] pl-[47px] pr-[38px]'>
        <Controller
          name='jobResponsibility'
          control={control}
          render={({ field }) => (
            <TextArea
              {...field}
              errors={errors.jobResponsibilities?.message}
              placeholder='Type Job Responsibilities'
              className='mt-[16px] h-[207px] max-w-[1082px] bg-transparent px-[12px] pt-[10px] placeholder:text-placeholderColor'
            />
          )}
        />
      </div>
    </div>
  );
};

export default JobResponsibilites;
