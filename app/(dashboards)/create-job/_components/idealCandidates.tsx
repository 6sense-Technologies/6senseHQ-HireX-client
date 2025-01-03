import React from 'react'
import Dropdownmenu from './dropdownmenu'

const IdealCandidates = () => {
  return (
    <div className='max-w-[1168px] rounded-2xl bg-jobBg mt-[32px]'>
    <div>
      <h1 className='pl-[48px] pt-[38px] text-headingXXS font-semibold'>
          Idea Candidate
      </h1>
    </div>
    <div className='w-full pt-[16px] pl-[47px] pr-[38px] pb-[38px]'>
        <Dropdownmenu/>
    </div>
  </div>
  )
}

export default IdealCandidates
