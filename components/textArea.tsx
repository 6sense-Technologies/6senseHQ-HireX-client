'use client';
import { FC } from 'react';
import { Warning } from '@phosphor-icons/react';
import cn from '../utils/cn';

type TextAreaProps = {
  placeholder: string;
  note?: string;
  name: string;
  errors?: string;
  className?: string;
};

const TextArea: FC<TextAreaProps> = ({
  placeholder,
  note,
  name,
  errors,
  className,
  ...rest
}) => {
  return (
    <div>
      <div className='relative w-full'>
        <textarea
          name={name}
          placeholder={placeholder}
          className={cn(
            'w-full max-w-[400px] resize-none rounded-md border pl-3 pt-1',
            errors
              ? 'border-red-500'
              : 'border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-0',
            className
          )}
          {...rest}
        ></textarea>
        <p className='absolute text-xs text-gray-400'>
          {errors ? (
            <span className='flex text-red-500'>
              <Warning className='mr-1' />
              {errors}
            </span>
          ) : (
            note
          )}
        </p>
      </div>
    </div>
  );
};

export default TextArea;
