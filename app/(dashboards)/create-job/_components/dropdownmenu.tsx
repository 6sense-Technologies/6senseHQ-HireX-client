'use client';
import { Button } from '@/components/ui/button';
import { Check, MagnifyingGlass } from '@phosphor-icons/react';
import { PlusCircle } from 'lucide-react';
import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import Tag from '../_components/tag';

const Dropdownmenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [newSkill, setNewSkill] = useState('');
  const [showNewSkillInput, setShowNewSkillInput] = useState(false);

  const skills = ['Skill 1', 'Skill 2', 'Skill 3'];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleRemoveSkill = (skill: string) => {
    setSelectedSkills((prev) => prev.filter((s) => s !== skill));
  };

  const filteredSkills = skills.filter((skill) =>
    skill.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNewSkillChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewSkill(event.target.value);
  };

  const handleAddNewSkill = () => {
    if (newSkill && !selectedSkills.includes(newSkill)) {
      setSelectedSkills((prev) => [...prev, newSkill]);
      setNewSkill('');
      setShowNewSkillInput(false);
    }
  };

  return (
    <div className='relative'>
      <div className='flex max-w-[156px] items-center justify-center rounded-md border border-dashed bg-white px-[14px] py-1'>
        <Button
          type='button'
          variant='withoutBorder'
          size='dropdownsize'
          className='text-twelve'
          onClick={toggleDropdown}
        >
          <span>
            <PlusCircle className='h-[160px]' />
          </span>
          Add
        </Button>
        <span className='px-[8px]'> |</span>

        <p className='text-nowrap rounded-[4px] bg-dropdownSecondaryBg px-[4px] py-[2px] text-twelve'>
          {selectedSkills.length} selected
        </p>
      </div>

      <div className='relative z-0 flex'>
        <Tag
          selectedSkills={selectedSkills}
          onRemoveSkill={handleRemoveSkill}
        />

        {showNewSkillInput && (
          <div className='mt-2 flex items-center gap-2'>
            <input
              type='text'
              value={newSkill}
              onChange={handleNewSkillChange}
              placeholder='New skill'
              className='rounded border px-2 py-1'
            />
            <Check className='cursor-pointer' onClick={handleAddNewSkill} />
          </div>
        )}
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className='absolute z-10 mt-2 max-w-[156px] rounded-md border bg-white p-2 shadow-lg top-9'
        >
          <div className='relative mb-2'>
            <MagnifyingGlass className='absolute left-1 top-1' />
            <input
              type='text'
              name=''
              id=''
              placeholder='Type'
              value={searchQuery}
              onChange={handleSearchChange}
              className='w-full border-b pl-8 placeholder:text-placeholderColor'
            />
          </div>
          {filteredSkills.map((skill) => (
            <div key={skill} className='flex items-center gap-2 p-2'>
              <input
                type='checkbox'
                checked={selectedSkills.includes(skill)}
                onChange={() => handleSkillToggle(skill)}
                className='h-4 w-4 cursor-pointer'
              />
              <span>{skill}</span>
            </div>
          ))}
          <div
            className='mt-2 cursor-pointer p-2'
            onClick={() => setShowNewSkillInput(true)}
          >
            <span>Add more...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdownmenu;
