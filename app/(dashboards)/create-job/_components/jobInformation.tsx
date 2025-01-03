import Dropdown from '@/components/dropdown';
import { Input } from '@/components/ui/input';
import React from 'react';

type JobInformationProps = {
  control: any;
  errors: any;
  setValue: (name: string, value: any) => void;
  jobPositionOptions: { label: string; value: string }[];
  departmentOptions: { label: string; value: string }[];
};

const JobInformation: React.FC<JobInformationProps> = ({
  control,
  errors,
  setValue,
  jobPositionOptions,
  departmentOptions,
}) => {
  return (
    <div className='max-w-[1168px] rounded-2xl bg-jobBg'>
      <div>
        <h1 className='pl-[48px] pt-[32px] text-headingXXS font-semibold'>
          Job information
        </h1>
      </div>

      <div className='flex gap-[24px] pb-[32px] pl-[48px] pr-[96px] pt-[16px]'>
        <div className='w-full'>
          <label
            htmlFor='jobPositionName'
            className='text-nowrap text-twelve font-medium text-dropdownLabelColor'
          >
            Job Position
          </label>
          <div>
            <Dropdown
              control={control}
              name='jobPositionName'
              errors={errors}
              setValue={setValue}
              options={jobPositionOptions}
              placeholder='Select...'
              ClassName='mt-[8px] max-w-[348px] placeholder:text-placholderColor'
            />
          </div>
        </div>
        <div className='w-full'>
          <label
            htmlFor='jobDepartmentName'
            className='text-nowrap text-twelve font-medium text-dropdownLabelColor'
          >
            Department (Optional)
          </label>
          <div>
            <Dropdown
              control={control}
              name='jobDepartmentName'
              errors={errors}
              setValue={setValue}
              options={departmentOptions}
              placeholder='Select...'
              ClassName='mt-[8px] max-w-[348px] placeholder:text-placholderColor'
            />
          </div>
        </div>

        <div className='w-full'>
          <label
            htmlFor='vacancy'
            className='text-nowrap text-twelve font-medium text-dropdownLabelColor'
          >
            No of Vacancy
          </label>
          <div>
            <Input
              control={control}
              placeholder='No of Vacancy'
              name='vacancy'
              errors={errors}
              className='placeholder:text-placholderColor mt-[8px] max-w-[348px] bg-white'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobInformation;