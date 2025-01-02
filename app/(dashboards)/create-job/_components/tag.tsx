import { X } from '@phosphor-icons/react';
import React from 'react';

type TagProps = {
  selectedSkills: string[];
  onRemoveSkill: (skill: string) => void;
};

const Tag: React.FC<TagProps> = ({ selectedSkills, onRemoveSkill }) => {
  return (
    <div>
      <div>
        <div className='mt-[16px] flex flex-wrap gap-[8px]'>
          {selectedSkills.map((skill) => (
            <div
              key={skill}
              className='flex items-center justify-between rounded-[4px] bg-dropdownSecondaryBg px-[8px] py-[4px]'
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