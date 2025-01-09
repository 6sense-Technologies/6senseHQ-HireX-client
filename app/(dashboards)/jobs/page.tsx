'use client';
import { getJobList } from '@/api/Job/JobApi';
import Pagination from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import { TJobList } from '@/types/Job/type';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

const JobList = () => {
  const [page, setPage] = useState<number>(1);

  const { data: jobList } = useQuery<TJobList, any, TJobList>({
    queryKey: ['jobList'],
    queryFn: () => getJobList(),
    enabled: true,
  });

  return (
    <div className='bg-white px-[16px]'>
      <div className='min-h-screen'>
        <div className='rounded-2xl bg-jobBg'>
          <div>
            <h1 className='pl-[48px] pt-[32px] text-headingXXS font-semibold'>
              Job List
            </h1>
          </div>

          <div className='pb-[38px] pl-[47px] pr-[30px] pt-[16px]'>
            <div className='w-full pb-[38px] pr-[30px] pt-[16px]'>
              <table className='w-full lg:max-w-[1000px]'>
                <thead>
                  <tr className='h-10 border-b-[2px] bg-white text-left text-xs'>
                    <th className='w-1/6 pl-3'>POSITION</th>
                    <th className='w-1/6 pl-3'>NO OF VACANCY</th>
                    <th className='w-1/6 pl-3'>CREATED BY</th>
                    <th className='w-1/6 pl-3'>CREATED AT</th>
                    <th className='w-1/6 pl-3'>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {jobList?.map((job, index) => (
                    <tr
                      key={index}
                      className='h-10 border-b-[2px] bg-white text-left text-xs'
                    >
                      <td className='pl-3'>{job.jobPosition}</td>
                      <td className='pl-3'>{job.numberOfVacancies}</td>
                      <td className='pl-3'>{job.createdBy}</td>
                      <td className='pl-3'>{job.createdAt}</td>
                      <td>
                        <div className='flex gap-6 pl-3'>
                          <Button variant='lightBlue' size='xs'>
                            Details
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination starts here */}
              <Pagination
                page={page}
                setPage={setPage}
                totalPage={1}
                totalItems={jobList?.length || 0}
                items={1}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobList;
