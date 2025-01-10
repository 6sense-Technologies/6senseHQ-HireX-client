import { TagProps } from '@/types/Job/type';
import { X } from '@phosphor-icons/react';
import React, { FC } from 'react';

const Tag: FC<TagProps> = ({ selectedSkills, onRemoveSkill }) => {
  return (
    <div>
      <div>
        <div className='mt-[16px] flex flex-wrap gap-[8px]'>
          {selectedSkills.map((skill) => (
            <div
              key={skill}
              className='flex items-center justify-between rounded-[4px] bg-white px-[8px] py-[4px]'
            >
              <p className='text-tagText text-twelve'>{skill}</p>
              <span
                onClick={() => onRemoveSkill(skill)}
                className='cursor-pointer'
              >
                <X />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tag;
