'use client';
import React from 'react'
import { useSearchParams } from 'next/navigation'


const page = () => {

  const searchParams = useSearchParams()

  console.log(searchParams.get('code'))

  return (
    <div className='px-10'>
    <div className='bg-white w-full h-screen border'>
      <h1 className='text-2xl text-black pt-3 pl-3'>Dashboard</h1>
    </div>
    </div>

  )
}

export default page
