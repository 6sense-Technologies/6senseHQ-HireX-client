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
import { useFormContext } from 'react-hook-form';

type Item = {
  id: number;
  interviewMedium?: string;
  label?: string;
  checked?: boolean;
};

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

interface InterviewStageProps {
  control: any;
  errors: any;
  setValue: (name: string, value: any) => void;
}

const InterviewStage: React.FC<InterviewStageProps> = ({
  control,
  errors,
  setValue,
}) => {
  const queryClient = useQueryClient();
  const [itemsLeft, setItemsLeft] = useState<Item[]>([]);
  const [itemsRight, setItemsRight] = useState<Item[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [draggedItemLeft, setDraggedItemLeft] = useState<Item | null>(null);
  const [hoveredItemLeft, setHoveredItemLeft] = useState<Item | null>(null);
  const [draggedItemRight, setDraggedItemRight] = useState<Item | null>(null);
  const [hoveredItemRight, setHoveredItemRight] = useState<Item | null>(null);
  const [newItemLabel, setNewItemLabel] = useState('');

  const { data: interviewStages } = useQuery<any, any, any>({
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
        checked: false,
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
    const newItems: Item[] = itemsLeft.map((item: Item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItemsLeft(newItems);

    if (newItems.some((item: Item) => !item.checked)) {
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
  const handleDragStartLeft = (item: Item) => {
    setDraggedItemLeft(item);
  };

  const handleDragOverLeft = (e: DragEvent<HTMLSpanElement>, item: Item) => {
    e.preventDefault();
    setHoveredItemLeft(item);
  };

  const handleDropLeft = (e: DragEvent<HTMLSpanElement>, dropItem: Item) => {
    e.preventDefault();
    if (draggedItemLeft && dropItem.id !== draggedItemLeft.id) {
      const newItems = itemsLeft.map((item: Item) => {
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
  const handleDragStartRight = (item: Item) => {
    setDraggedItemRight(item);
  };

  const handleDragOverRight = (e: DragEvent<HTMLSpanElement>, item: Item) => {
    e.preventDefault();
    setHoveredItemRight(item);
  };

  const handleDropRight = (e: DragEvent<HTMLSpanElement>, dropItem: Item) => {
    e.preventDefault();
    if (draggedItemRight && dropItem.id !== draggedItemRight.id) {
      const newItems = itemsRight.map((item: Item) => {
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

  const removeItem = (id: number) => {
    const newItemsRight = itemsRight.filter((item) => item.id !== id);
    setItemsRight(newItemsRight);

    const newItemsLeft = itemsLeft.map((item) =>
      item.id === id ? { ...item, checked: false } : item
    );
    setItemsLeft(newItemsLeft);
    setSelectAll(false);
  };

  // Collect data from the right table and format it as required
  useEffect(() => {
    const formattedInterviewStages = itemsRight.map((item) => ({
      interviewStageName: item.label,
      interviewMedium: item.interviewMedium,
    }));
    setValue('interviewStages', formattedInterviewStages);
  }, [itemsRight, setValue]);

  return (
    <div className='mt-[32px] max-w-[1168px] rounded-2xl bg-jobBg'>
      <div>
        <h1 className='pl-[48px] pt-[38px] text-headingXXS font-semibold'>
          Interview Stages
        </h1>
      </div>
      <div className='flex w-full items-center gap-[8px] pb-[38px] pl-[47px] pr-[38px] pt-[16px]'>
        <div className='full h-[200px] max-w-[409px] overflow-y-auto'>
          <table className='w-full max-w-[405px] rounded-md bg-white'>
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
                  className={`${
                    item.id === draggedItemLeft?.id && 'bg-blue-100 opacity-30'
                  } ${
                    item.id === hoveredItemLeft?.id
                      ? 'border-2'
                      : 'border-gray-100'
                  }`}
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
                      <DotsSixVertical />
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
                    placeholder='Type Name...'
                    className='w-full border-b py-[9px] pl-8 text-twelve placeholder:text-twelve placeholder:text-placeholderColor'
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <span>
          <ArrowRight onClick={handleMoveToRight} className='cursor-pointer' />
        </span>
        <div className='h-[200px] w-full max-w-[655px] overflow-y-auto'>
          <table className='w-full max-w-[650px] rounded-md bg-white'>
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
                  className={`border-b ${
                    item.id === draggedItemRight?.id && 'bg-blue-100 opacity-30'
                  } ${
                    item.id === hoveredItemRight?.id
                      ? 'border-2'
                      : 'border-gray-100'
                  }`}
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
                        <DotsSixVertical />
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
