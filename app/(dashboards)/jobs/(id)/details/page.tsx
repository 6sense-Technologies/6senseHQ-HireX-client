'use client';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from '@phosphor-icons/react';
import Link from 'next/link';
import React from 'react';

const JoblistDetails = () => {
  return (
    <div className='bg-white px-[16px]'>
      <div className='min-h-screen'>
        <div className='rounded-2xl bg-jobBg'>
          <div>
            <h1 className='pl-[24px] pt-[24px] text-headingXXS font-semibold'>
              Job Information
            </h1>
          </div>
          <div className='mt-[16px] flex items-center justify-between pl-[24px] lg:max-w-[400px]'>
            <div>
              <p className='mb-[2px] text-twelve text-subHeading'>Position</p>
              <p className='text-twelve font-medium text-textSecondary'>
                Content Writer
              </p>
            </div>
            <div>
              <p className='mb-[2px] text-twelve text-subHeading'>Department</p>
              <p className='text-twelve font-medium text-textSecondary'>
                Marketing
              </p>
            </div>
          </div>
          <div className='flex items-center'>
            <div className='mt-[16px] flex items-center gap-x-[4px] pb-[24px] pl-[24px]'>
              <Link
                href='/'
                className='text-twelve text-dropdownLabelColor underline'
              >
                Job Description
              </Link>
              <ArrowUpRight className='font-medium text-darkBlackColor' />
            </div>
            <div className='mt-[16px] flex items-center gap-x-[4px] pb-[24px] pl-[24px]'>
              <Link
                href='/'
                className='text-twelve text-dropdownLabelColor underline'
              >
                Ideal Candidate
              </Link>
              <ArrowUpRight className='font-medium text-darkBlackColor' />
            </div>
          </div>
        </div>
        <div className='mt-[48px] rounded-2xl bg-jobBg'>
          <div className='flex items-center justify-between'>
            <h1 className='pl-[24px] pt-[24px] text-headingXXS font-semibold'>
              Candidates
            </h1>
            <Button variant='primary'>Upload CV</Button>
          </div>
          <div className='mt-[16px] flex items-center justify-between pl-[24px] lg:max-w-[400px]'>
            <div>
              <p className='mb-[2px] text-twelve text-subHeading'>Position</p>
              <p className='text-twelve font-medium text-textSecondary'>
                Content Writer
              </p>
            </div>
            <div>
              <p className='mb-[2px] text-twelve text-subHeading'>Department</p>
              <p className='text-twelve font-medium text-textSecondary'>
                Marketing
              </p>
            </div>
          </div>
          <div className='flex items-center'>
            <div className='mt-[16px] flex items-center gap-x-[4px] pb-[24px] pl-[24px]'>
              <Link
                href='/'
                className='text-twelve text-dropdownLabelColor underline'
              >
                Job Description
              </Link>
              <ArrowUpRight className='font-medium text-darkBlackColor' />
            </div>
            <div className='mt-[16px] flex items-center gap-x-[4px] pb-[24px] pl-[24px]'>
              <Link
                href='/'
                className='text-twelve text-dropdownLabelColor underline'
              >
                Ideal Candidate
              </Link>
              <ArrowUpRight className='font-medium text-darkBlackColor' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoblistDetails;
