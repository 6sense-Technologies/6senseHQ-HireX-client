import { CircleNotch  } from '@phosphor-icons/react';
import React from 'react';

const Loader = () => {
  return (
    <div className='flex h-screen items-center justify-center'>
      <CircleNotch  size={40} className='text-blue-600 animate-spin' />
    </div>
  );
};

export default Loader;
