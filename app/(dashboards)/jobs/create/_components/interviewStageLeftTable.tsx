import { TInterViewStagesLeftTableProps } from '@/types/Job/type';
import { Plus } from '@phosphor-icons/react';
import React, { FC, KeyboardEvent } from 'react';



const InterviewStageLeftTable: FC<TInterViewStagesLeftTableProps> = ({
  selectAll,
  handleSelectAll,
  itemsLeft,
  handleCheckboxChange,
  handleAddNewItem,
  newItemLabel,
  setNewItemLabel,
  handleKeyDown,

}) => {
  return (
    <div className='h-[200px] w-full overflow-y-auto lg:max-w-[409px] xl:max-w-[605px]'>
      <table className='w-full rounded-md bg-white lg:max-w-[405px] xl:max-w-[600px]'>
        <thead className='sticky top-0 z-10 bg-white'>
          <tr>
            <th className='flex items-center gap-[30px] border-b py-[9px] pl-[17px]'>
              <input
                type='checkbox'
                checked={selectAll}
                onChange={handleSelectAll}
                className='h-3'
              />
              <p className='text-twelve font-medium text-placeholderColor'>
                Interview Options
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          {itemsLeft.map((item) => (
            <tr key={item.id}>
              <td className='flex items-center gap-[30px] border-b py-[9px] pl-[17px]'>
                <input
                  type='checkbox'
                  checked={item.checked}
                  onChange={() => handleCheckboxChange(item.id)}
                  className='h-3'
                />
                <p className='text-twelve font-medium text-dropdownLabelColor'>
                  {item.label}
                </p>
              </td>
            </tr>
          ))}
          <tr>
            <td className='flex items-center gap-[8px] pl-[17px]'>
              <Plus
                className='cursor-pointer bg-white text-placeholderColor'
                onClick={handleAddNewItem}
              />
              <input
                type='text'
                name='interviewStageName'
                value={newItemLabel}
                onChange={(e) => setNewItemLabel(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder='Type Name...'
                className='w-full border-b py-[9px] pl-8 text-twelve placeholder:text-twelve placeholder:text-placeholderColor'
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InterviewStageLeftTable;
