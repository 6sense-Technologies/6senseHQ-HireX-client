'use client';
import {
  DotsSixVertical,
  ArrowRight,
  Phone,
  PuzzlePiece,
  UsersThree,
  VideoCamera,
  Trash,
  Plus,
} from '@phosphor-icons/react';
import React, { DragEvent, useEffect, useState } from 'react';
import InterviewStageDropdown from './interviewStageDropdown';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getInterviewStages,
  handleCreateInterviewStage,
} from '@/api/Job/JobApi';
import cn from '@/utils/cn';
import { InterviewStageItem, InterViewStageList, InterviewStageProps } from '@/types/Job/type';

const interviewStageOptions = [
  {
    value: 'Online-Video',
    label: (
      <span className='flex items-center justify-start gap-[4px] text-nowrap'>
        <VideoCamera size={16} /> Online
      </span>
    ),
  },
  {
    value: 'Online-Voice',
    label: (
      <span className='flex items-center justify-start gap-[4px] text-nowrap'>
        <Phone size={16} /> Online
      </span>
    ),
  },
  {
    value: 'Online-Quiz',
    label: (
      <span className='flex items-center justify-start gap-[4px] text-nowrap'>
        <PuzzlePiece size={16} /> Online
      </span>
    ),
  },
  {
    value: 'Offline',
    label: (
      <span className='flex items-center justify-start gap-[4px] text-nowrap'>
        <UsersThree size={16} /> Offline
      </span>
    ),
  },
];

const InterviewStage: React.FC<InterviewStageProps> = ({
  control,
  errors,
  setValue,
}) => {
  const queryClient = useQueryClient();
  const [itemsLeft, setItemsLeft] = useState<InterviewStageItem[]>([]);
  const [itemsRight, setItemsRight] = useState<InterviewStageItem[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [draggedItemLeft, setDraggedItemLeft] = useState<InterviewStageItem | null>(null);
  const [hoveredItemLeft, setHoveredItemLeft] = useState<InterviewStageItem | null>(null);
  const [draggedItemRight, setDraggedItemRight] = useState<InterviewStageItem | null>(null);
  const [hoveredItemRight, setHoveredItemRight] = useState<InterviewStageItem | null>(null);
  const [newItemLabel, setNewItemLabel] = useState('');

  const { data: interviewStages } = useQuery<
    InterViewStageList,
    any,
    InterViewStageList
  >({
    queryKey: ['interviewStages'],
    queryFn: () => getInterviewStages(),
    enabled: true,
  });

  const interviewStageMutation = useMutation({
    mutationFn: handleCreateInterviewStage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interviewStages'] });
    },
  });

  useEffect(() => {
    if (interviewStages) {
      const formattedStages = interviewStages.map((stage: any) => ({
        id: stage.interviewStageId,
        label: stage.interviewStageName,
        checked: itemsLeft.find(item => item.id === stage.interviewStageId)?.checked || false,
      }));
      setItemsLeft(formattedStages);
    }
  }, [interviewStages]);

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setItemsLeft(itemsLeft.map((item) => ({ ...item, checked: newSelectAll })));
  };

  const handleCheckboxChange = (id: number) => {
    const newItems: InterviewStageItem[] = itemsLeft.map((item: InterviewStageItem) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItemsLeft(newItems);

    if (newItems.some((item: InterviewStageItem) => !item.checked)) {
      setSelectAll(false);
    }
  };

  const handleMoveToRight = () => {
    const selectedItems = itemsLeft.filter(
      (item) =>
        item.checked &&
        !itemsRight.some((rightItem) => rightItem.id === item.id)
    );
    const newItemsRight = selectedItems.map((item) => ({
      id: item.id,
      label: item.label,
      interviewMedium: '',
      checked: item.checked,
    }));
    setItemsRight([...itemsRight, ...newItemsRight]);
    setItemsLeft(
      itemsLeft.map((item) =>
        item.checked ? { ...item, checked: true } : item
      )
    );
  };

  // Left Table Drag-and-Drop Functions
  const handleDragStartLeft = (item: InterviewStageItem) => {
    setDraggedItemLeft(item);
  };

  const handleDragOverLeft = (e: DragEvent<HTMLSpanElement>, item: InterviewStageItem) => {
    e.preventDefault();
    setHoveredItemLeft(item);
  };

  const handleDropLeft = (e: DragEvent<HTMLSpanElement>, dropItem: InterviewStageItem) => {
    e.preventDefault();
    if (draggedItemLeft && dropItem.id !== draggedItemLeft.id) {
      const newItems = itemsLeft.map((item: InterviewStageItem) => {
        if (item.id === dropItem.id) {
          return draggedItemLeft;
        }
        if (item.id === draggedItemLeft.id) {
          return dropItem;
        }
        return item;
      });
      setItemsLeft(newItems);
    }
    setDraggedItemLeft(null);
    setHoveredItemLeft(null);
  };

  // Right Table Drag-and-Drop Functions
  const handleDragStartRight = (item: InterviewStageItem) => {
    setDraggedItemRight(item);
  };

  const handleDragOverRight = (e: DragEvent<HTMLSpanElement>, item: InterviewStageItem) => {
    e.preventDefault();
    setHoveredItemRight(item);
  };

  const handleDropRight = (e: DragEvent<HTMLSpanElement>, dropItem: InterviewStageItem) => {
    e.preventDefault();
    if (draggedItemRight && dropItem.id !== draggedItemRight.id) {
      const newItems = itemsRight.map((item: InterviewStageItem) => {
        if (item.id === dropItem.id) {
          return draggedItemRight;
        }
        if (item.id === draggedItemRight.id) {
          return dropItem;
        }
        return item;
      });
      setItemsRight(newItems);
    }
    setDraggedItemRight(null);
    setHoveredItemRight(null);
  };

  const handleAddNewItem = () => {
    if (newItemLabel.trim() !== '') {
      interviewStageMutation.mutate({ interviewStageName: newItemLabel });
      setNewItemLabel('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddNewItem();
    }
  };

  const removeItem = (id: number) => {
    const newItemsRight = itemsRight.filter((item) => item.id !== id);
    setItemsRight(newItemsRight);

    const newItemsLeft = itemsLeft.map((item) =>
      item.id === id ? { ...item, checked: false } : item
    );
    setItemsLeft(newItemsLeft);
    setSelectAll(false);
  };

  // Collected data from right table and formated the data as required
  useEffect(() => {
    const formattedInterviewStages = itemsRight.map((item) => ({
      interviewStageName: item.label,
      interviewMedium: item.interviewMedium,
    }));
    setValue('interviewStages', formattedInterviewStages);
  }, [itemsRight, setValue]);

  return (
    <div className='mt-[32px] rounded-2xl bg-jobBg'>
      <div>
        <h1 className='pl-[48px] pt-[38px] text-headingXXS font-semibold'>
          Interview Stages
        </h1>
      </div>
      <div className='flex w-full items-center gap-[8px] pb-[38px] pl-[47px] pr-[38px] pt-[16px]'>
        <div className='h-[200px] w-full overflow-y-auto lg:max-w-[409px] xl:max-w-[605px]'>
          <table className='w-full rounded-md bg-white lg:max-w-[405px] xl:max-w-[600px]'>
            <thead>
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
                <tr
                  key={item.id}
                  className={cn({
                    'bg-blue-100 opacity-30': item.id === draggedItemLeft?.id,
                    'border-2': item.id === hoveredItemLeft?.id,
                    'border-gray-100': item.id !== hoveredItemLeft?.id,
                  })}
                >
                  <td className='flex items-center gap-[8px] border-b py-[9px] pl-[17px]'>
                    <input
                      type='checkbox'
                      checked={item.checked}
                      onChange={() => handleCheckboxChange(item.id)}
                      className='h-3'
                    />
                    <span
                      draggable
                      onDragStart={() => handleDragStartLeft(item)}
                      onDragOver={(e) => handleDragOverLeft(e, item)}
                      onDrop={(e) => handleDropLeft(e, item)}
                      onDragLeave={() => setHoveredItemLeft(null)}
                      className='cursor-pointer'
                    >
                      <DotsSixVertical className='text-lightGrayColor' />
                    </span>
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
        <span>
          <ArrowRight onClick={handleMoveToRight} className='cursor-pointer border' />
        </span>
        <div className='h-[200px] w-full overflow-y-auto lg:max-w-[655px] xl:max-w-[900px]'>
          <table className='w-full rounded-md bg-white lg:max-w-[650px] xl:max-w-[900px]'>
            <thead>
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
              {itemsRight.map((item) => (
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
                        <DotsSixVertical className='text-lightGrayColor'/>
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
                        const newItemsRight = itemsRight.map((rightItem) =>
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
      </div>
    </div>
  );
};

export default InterviewStage;