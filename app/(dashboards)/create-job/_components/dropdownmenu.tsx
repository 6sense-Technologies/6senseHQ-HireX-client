'use client';
import { Button } from '@/components/ui/button';
import { Check, MagnifyingGlass } from '@phosphor-icons/react';
import { PlusCircle } from 'lucide-react';
import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import Tag from '../_components/tag';
import { Controller } from 'react-hook-form';
import { DropdownMenuProps } from '@/types/Job/type';

const Dropdownmenu: React.FC<DropdownMenuProps> = ({ control, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [newSkill, setNewSkill] = useState('');
  const [showNewSkillInput, setShowNewSkillInput] = useState(false);

  const skills = [
    'C++',
    'TypeScript',
    'MongoDB',
    'JavaScript',
    'React',
    'Node.js',
    'Python',
    'Django',
    'Java',
    'Spring Boot',
    'C#',
    'ASP.NET',
    'Ruby on Rails',
    'Angular',
    'Vue.js',
    'SQL',
    'NoSQL',
    'AWS',
    'Azure',
    'Docker',
    'Kubernetes',
    'Git',
    'CI/CD',
    'Agile Methodologies',
    'Scrum',
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
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

  const handleAddNewSkill = (field: any) => {
    if (newSkill && !field.value?.includes(newSkill)) {
      const updatedSkills = [...(field.value || []), newSkill];
      field.onChange(updatedSkills);
      setNewSkill('');
      setShowNewSkillInput(false);
    }
  };

  const handleAddmore = () => {
    setShowNewSkillInput(true);
    setIsOpen(false);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="relative">
          <div className="flex max-w-[156px] items-center justify-center rounded-md border border-dashed bg-white px-[14px] py-1">
            <Button
              type="button"
              variant="withoutBorder"
              size="dropdownsize"
              className="text-twelve"
              onClick={toggleDropdown}
            >
              <span>
                <PlusCircle className="h-[160px]" />
              </span>
              Add
            </Button>
            <span className="px-[8px] text-dropdownMenuBorderColor"> |</span>

            <p className="text-nowrap rounded-[4px] bg-dropdownSecondaryBg px-[4px] py-[2px] text-twelve">
              {(field.value || []).length} selected
            </p>
          </div>

          <div className="relative z-0 flex">
            <Tag
              selectedSkills={field.value || []}
              onRemoveSkill={(skill) =>
                field.onChange(
                  (field.value || []).filter((s: string) => s !== skill)
                )
              }
            />

            {showNewSkillInput && (
              <div className="relative mt-2 flex items-center">
                <input
                  type="text"
                  value={newSkill}
                  onChange={handleNewSkillChange}
                  placeholder="New skill"
                  className="rounded border px-2 py-1"
                />
                <Check
                  className="absolute left-[205px] cursor-pointer"
                  onClick={() => handleAddNewSkill(field)}
                />
              </div>
            )}
          </div>

          {isOpen && (
            <div
              ref={dropdownRef}
              className="absolute top-9 z-10 mt-2 h-[200px] max-w-[156px] overflow-y-auto overflow-x-hidden rounded-md border bg-white p-2 shadow-lg"
            >
              <div className="relative mb-2">
                <MagnifyingGlass className="absolute left-1 top-1 text-placeholderColor" />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Status"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full border-b pl-8 placeholder:text-placeholderColor"
                />
              </div>
              {filteredSkills.map((skill) => (
                <div key={skill} className="flex items-center gap-2 p-2">
                  <input
                    type="checkbox"
                    checked={(field.value || []).includes(skill)}
                    onChange={() =>
                      field.onChange(
                        (field.value || []).includes(skill)
                          ? (field.value || []).filter(
                              (s: string) => s !== skill
                            )
                          : [...(field.value || []), skill]
                      )
                    }
                    className="h-4 w-4 cursor-pointer"
                  />
                  <span>{skill}</span>
                </div>
              ))}
              <div
                className="mt-2 cursor-pointer p-2"
                onClick={handleAddmore}
              >
                <span>Add More</span>
              </div>
            </div>
          )}
        </div>
      )}
    />
  );
};

export default Dropdownmenu;
