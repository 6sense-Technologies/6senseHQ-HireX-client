import TextArea from '@/components/textArea';
import { JobResponsibilitiesProps } from '@/types/Job/type';
import React from 'react';
import { Controller } from 'react-hook-form';

const JobResponsibilites: React.FC<JobResponsibilitiesProps> = ({
  control,
  errors,
}) => {
  return (
    <div className='mt-[32px] rounded-2xl bg-jobBg'>
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
              errors={errors}
              placeholder='Type Job Responsibilities'
              className='mt-[16px] h-[207px] resize bg-white px-[12px] pt-[10px] placeholder:text-placeholderColor lg:max-w-[1082px] xl:max-w-[1632px]'
            />
          )}
        />
      </div>
    </div>
  );
};

export default JobResponsibilites;
