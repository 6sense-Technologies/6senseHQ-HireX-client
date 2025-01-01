import React from 'react';

const OrDivider = () => {
  return (
    <div className='my-4 flex items-center'>
      <div className='flex-grow border-t border-gray-300'></div>
      <span className='mx-4 text-gray-500'>or</span>
      <div className='flex-grow border-t border-gray-300'></div>
    </div>
  );
};

export default OrDivider;
