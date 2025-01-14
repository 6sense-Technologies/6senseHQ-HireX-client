import {
  InterviewStageItem,
  TInterviewStageRightTableProps,
} from '@/types/Job/type';
import cn from '@/utils/cn';
import { DotsSixVertical, Trash } from '@phosphor-icons/react';
import React, { DragEvent, FC } from 'react';
import InterviewStageDropdown from './interviewStageDropdown';

const InterviewStageRightTable: FC<TInterviewStageRightTableProps> = ({
  itemsRight,
  draggedItemRight,
  hoveredItemRight,
  handleDragStartRight,
  handleDragOverRight,
  handleDropRight,
  setHoveredItemRight,
  control,
  setItemsRight,
  interviewStageOptions,
  removeItem,
}) => {
  return (
    <div className='h-[200px] w-full overflow-y-auto lg:max-w-[655px] xl:max-w-[900px]'>
      <table className='w-full rounded-md bg-white lg:max-w-[650px] xl:max-w-[900px]'>
        <thead className='sticky top-0 z-10 bg-white'>
          <tr className='border-b'>
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
            <th className=''></th>
          </tr>
        </thead>
        <tbody>
          {itemsRight.map((item: InterviewStageItem) => (
            <tr
              key={item.id}
              className={cn('border-b', {
                'bg-blue-100 opacity-30': item.id === draggedItemRight?.id,
                'border-2': item.id === hoveredItemRight?.id,
                'border-gray-100': item.id !== hoveredItemRight?.id,
              })}
            >
              <td className='flex items-center justify-between py-[9px] pl-[17px]'>
                <div className='flex items-center gap-[8px]'>
                  <span
                    draggable
                    onDragStart={() => handleDragStartRight(item)}
                    onDragOver={(e) => handleDragOverRight(e, item)}
                    onDrop={(e) => handleDropRight(e, item)}
                    onDragLeave={() => setHoveredItemRight(null)}
                    className='cursor-pointer'
                  >
                    <DotsSixVertical className='text-lightGrayColor' />
                  </span>
                  <p className='text-twelve font-medium text-dropdownLabelColor'>
                    {item.label}
                  </p>
                </div>
              </td>
              <td className='py-1'>
                <InterviewStageDropdown
                  name={`interviewMedium[${item.id}]`}
                  control={control}
                  value={item.interviewMedium}
                  onChange={(value) => {
                    const newItemsRight = itemsRight.map(
                      (rightItem: InterviewStageItem) =>
                        rightItem.id === item.id
                          ? { ...rightItem, interviewMedium: value }
                          : rightItem
                    );
                    setItemsRight(newItemsRight);
                  }}
                  options={interviewStageOptions}
                  errors={{}}
                  placeholder='Select'
                  ClassName=''
                />
              </td>
              <td>
                <span
                  className='cursor-pointer'
                  onClick={() => removeItem(item.id)}
                >
                  <Trash size={20} />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InterviewStageRightTable;
