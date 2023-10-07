import React from 'react'

const RepoCard = () => {
  return (
    <div className='p w-full p-6 border' style={{ borderColor: '#EAECF0', backgroundColor: '#F9FAFB' }}>
      <div className='flex gap-2'>
        <p className='text-[16px] font-bold' style={{ color: '#101828' }}>pixel8Labs-api</p>
        <div className='px-2 py-[2px] w-fit rounded-lg' style={{ backgroundColor: '#F4F3FF' }}>
          <p style={{ color: '#5925DC' }} className='font-medium text-xs'>public</p>
        </div>
      </div>
      <div className='mt-2'>
        <p className='text-sm font-normal' style={{ color: '#101828' }}>Awesome Api from us for general development (all-at-once)</p>
        <div className='flex gap-6 items-center mt-6'>
          <div className='flex gap-2 items-center'>
            <div className='rounded-full' style={{ backgroundColor: '#B42318', height: 12, width: 12 }}></div>
            <p  style={{ color: '#101828' }} className='text-xs'>
            Ruby
            </p>
            </div>
          <p style={{ color: '#475467' }} className='text-xs'>Updated just now</p>
        </div>
      </div>
    </div>
  )
}

export default RepoCard
