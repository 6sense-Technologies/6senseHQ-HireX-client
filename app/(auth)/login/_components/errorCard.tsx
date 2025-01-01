import { Warning, X } from '@phosphor-icons/react';
import React from 'react';

const ErrorCard = () => {
  return (
    <div className='bg-errorBg mt-[32px] max-w-[320px]'>
      <div className='flex gap-[8px] px-[6px] py-[6px]'>
        <span>
          <Warning weight='fill' className='text-errorColor' />
        </span>
        <p className='text-errorColor text-xs'>
          There is an issue with the credentials you have entered. Please try
          again.
        </p>
        <span>
          <X className='text-errorColor pt-[4px]' />
        </span>
      </div>
    </div>
  );
};

export default ErrorCard;
