import { Warning, X } from '@phosphor-icons/react';
import React from 'react';

type ErrorCardType = {
  setErrorFlag: (flag: boolean) => void;
  errorFlag: boolean;
};

const ErrorCard = ({ errorFlag, setErrorFlag }: ErrorCardType) => {
  const handleCrossClick = () => {
    setErrorFlag(false);
  };

  return (
    <>
      {errorFlag ? (
        <div className='mt-[32px] max-w-[320px] bg-errorBg'>
          <div className='flex gap-[8px] px-[6px] py-[6px]'>
            <span>
              <Warning weight='fill' className='text-errorColor' />
            </span>
            <p className='text-xs text-errorColor'>
              There is an issue with the credentials you have entered. Please
              try again.
            </p>
            <span onClick={handleCrossClick} className='cursor-pointer'>
              <X className='pt-[4px] text-errorColor' />
            </span>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ErrorCard;
