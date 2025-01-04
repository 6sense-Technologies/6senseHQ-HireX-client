import React from 'react';
import Dropdownmenu from './dropdownmenu';
import { IdealCandidatesProps } from '@/types/Job/type';

const IdealCandidates: React.FC<IdealCandidatesProps> = ({
  control,
  errors,
}) => {
  return (
    <div className='mt-[32px] rounded-2xl bg-jobBg'>
      <div>
        <h1 className='pl-[48px] pt-[38px] text-headingXXS font-semibold'>
          Ideal Candidate
        </h1>
      </div>
      <div className='w-full pb-[38px] pl-[47px] pr-[38px] pt-[16px]'>
        <Dropdownmenu control={control} name='jobKeywords' />
      </div>
    </div>
  );
};

export default IdealCandidates;
