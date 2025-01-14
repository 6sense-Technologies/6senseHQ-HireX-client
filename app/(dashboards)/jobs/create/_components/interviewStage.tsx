'use client';
import {
  ArrowRight,
  Trash,
  Plus,
  DotsSixVertical,
} from '@phosphor-icons/react';
import React, { DragEvent, useEffect, useState } from 'react';
import InterviewStageDropdown from './interviewStageDropdown';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getInterviewStages,
  handleCreateInterviewStage,
} from '@/api/Job/JobApi';
import cn from '@/utils/cn';
import {
  InterviewStageItem,
  InterViewStageList,
  InterviewStageProps,
} from '@/types/Job/type';
import InterviewStageLeftTable from './interviewStageLeftTable';
import EmptyViewInterviewStageRightTable from './emptyViewInterviewStageRightTable';
import InterviewStageRightTable from './interviewStageRightTable.';

const interviewStageOptions = [
  {
    value: 'Onsite Interview',
    label: 'Onsite Interview',
  },
  {
    value: 'Online Test',
    label: 'Online Test',
  },
  {
    value: 'Online Interview',
    label: 'Online Interview',
  },
  {
    value: 'Phone/Audio Interview',
    label: 'Phone/Audio Interview',
  },
];

const InterviewStage: React.FC<InterviewStageProps> = ({
  control,
  errors,
  setValue,
  isButtonClicked,
}) => {
  const queryClient = useQueryClient();
  const [itemsLeft, setItemsLeft] = useState<InterviewStageItem[]>([]);
  const [itemsRight, setItemsRight] = useState<InterviewStageItem[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [draggedItemRight, setDraggedItemRight] =
    useState<InterviewStageItem | null>(null);
  const [hoveredItemRight, setHoveredItemRight] =
    useState<InterviewStageItem | null>(null);
  const [newItemLabel, setNewItemLabel] = useState('');

  const isInterviewMediumError = errors?.interviewStages?.length
    ? errors?.interviewStages?.some(
        (item: any) => item.interviewMedium?.message
      )
    : false;
  console.log('🚀 ~ isInterviewMediumError:', isInterviewMediumError);

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
        checked:
          itemsLeft.find((item) => item.id === stage.interviewStageId)
            ?.checked || false,
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
    const newItems: InterviewStageItem[] = itemsLeft.map(
      (item: InterviewStageItem) =>
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

  // Right Table Drag-and-Drop Functions
  const handleDragStartRight = (item: InterviewStageItem) => {
    setDraggedItemRight(item);
  };

  const handleDragOverRight = (
    e: DragEvent<HTMLSpanElement>,
    item: InterviewStageItem
  ) => {
    e.preventDefault();
    setHoveredItemRight(item);
  };

  const handleDropRight = (
    e: DragEvent<HTMLSpanElement>,
    dropItem: InterviewStageItem
  ) => {
    e.preventDefault();
    if (draggedItemRight && dropItem.id !== draggedItemRight.id) {
      const currentIndex = itemsRight.findIndex(
        (item) => item.id === draggedItemRight.id
      );
      const dropIndex = itemsRight.findIndex((item) => item.id === dropItem.id);

      const updatedItems = [...itemsRight];
      updatedItems.splice(currentIndex, 1);

      if (currentIndex < dropIndex) {
        // Dragging item from top to bottom
        updatedItems.splice(dropIndex, 0, draggedItemRight);
      } else {
        // Dragging item from bottom to top
        updatedItems.splice(dropIndex, 0, draggedItemRight);
      }

      setItemsRight(updatedItems);
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

  // Collected data from right table and formatted the data as required
  useEffect(() => {
    const formattedInterviewStages = itemsRight.map((item) => ({
      id: item.id,
      interviewStageName: item.label,
      interviewMedium: item.interviewMedium,
    }));
    setValue('interviewStages', formattedInterviewStages, {
      shouldValidate: true,
    });
  }, [itemsRight, setValue]);

  console.log('right', itemsRight);

  return (
    <div className='relative mt-[32px] rounded-2xl bg-jobBg'>
      <div>
        <h1 className='pl-[48px] pt-[38px] text-headingXXS font-semibold'>
          Interview Stages
        </h1>
      </div>
      <div className='flex w-full items-center gap-[8px] pb-[38px] pl-[47px] pr-[38px] pt-[16px]'>
        <InterviewStageLeftTable
          selectAll={selectAll}
          handleSelectAll={handleSelectAll}
          itemsLeft={itemsLeft}
          handleCheckboxChange={handleCheckboxChange}
          handleAddNewItem={handleAddNewItem}
          newItemLabel={newItemLabel}
          setNewItemLabel={setNewItemLabel}
          handleKeyDown={handleKeyDown}
        />
        <span>
          <ArrowRight
            onClick={handleMoveToRight}
            className='cursor-pointer border'
          />
        </span>
        {itemsRight.length === 0 ? (
          <EmptyViewInterviewStageRightTable
            isButtonClicked={isButtonClicked}
            errors={errors}
          />
        ) : (
          <InterviewStageRightTable
            itemsRight={itemsRight}
            draggedItemRight={draggedItemRight}
            hoveredItemRight={hoveredItemRight}
            handleDragStartRight={handleDragStartRight}
            handleDragOverRight={handleDragOverRight}
            handleDropRight={handleDropRight}
            setHoveredItemRight={setHoveredItemRight}
            control={control}
            interviewStageOptions={interviewStageOptions}
            removeItem={removeItem}
            setItemsRight={setItemsRight}
          />
        )}
      </div>
      <div className='absolute bottom-[10px] left-[545px]'>
        <p className='bottom-3 right-[320px] text-xs text-gray-400'>
          <span className='flex text-sm font-medium text-red-500'>
            {isButtonClicked && errors?.interviewStages?.message
              ? errors?.interviewStages?.message
              : isButtonClicked && isInterviewMediumError
                ? 'Interview Medium is required.'
                : null}
          </span>
        </p>
      </div>
    </div>
  );
};

export default InterviewStage;
