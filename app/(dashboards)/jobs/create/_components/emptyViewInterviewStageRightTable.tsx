import { TEmptyViewInterviewStageRightTableProps } from '@/types/Job/type';
import cn from '@/utils/cn';
import React, { FC } from 'react'



const EmptyViewInterviewStageRightTable : FC<TEmptyViewInterviewStageRightTableProps> = ({isButtonClicked, errors}) => {
  return (
          <div
            className={cn(
              'relative h-[200px] w-full overflow-y-auto border bg-white lg:max-w-[655px] xl:max-w-[900px]',
              { 'border-red-500': isButtonClicked && errors?.interviewStages }
            )}
          >
            <table className='w-full rounded-md bg-white lg:max-w-[650px] xl:max-w-[900px]'>
              <thead className='sticky top-0 z-10 bg-white'>
                <tr className='border-b'>
                  {isButtonClicked && errors.interviewStages ? (
                    <>
                      <th className='flex max-w-[200px] justify-start py-[9px] pl-[40px]'>
                        <p className='text-twelve font-medium text-deepRedcolor'>
                          Selected Interview Stages
                        </p>
                      </th>
                      <th className='text-start'>
                        <p className='py-[9px] text-twelve font-medium text-deepRedcolor'>
                          Interview Medium
                        </p>
                      </th>
                    </>
                  ) : (
                    <>
                      <th className='flex max-w-[200px] justify-start py-[9px] pl-[40px]'>
                        <p className='text-twelve font-medium text-placeholderColor'>
                          Interview Selected
                        </p>
                      </th>
                      <th className='text-start'>
                        <p className='py-[9px] text-twelve font-medium text-placeholderColor'>
                          Interview Medium
                        </p>
                      </th>
                    </>
                  )}
                  <th className=''></th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
  )
}

export default EmptyViewInterviewStageRightTable
