import Image from 'next/image'
import React from 'react'

const Profile = () => {
  return (
    <div className='items-center flex flex-col'>
      <div>
      <Image src={'/image 4.png'} height={160} width={160} alt='Profile Photo'/>

      <div className='text-center mt-2'>
        <p className='font-bold md:text-[24px]' style={{ color: '#101828' }}>Pixel8labs</p>
        <p className='md:text-base' style={{ color: '#344054' }}>@pixel8Labs</p>
      </div>
      </div>

      <div className='mt-6 w-full'>
        <p style={{ color: '#101828' }} className='text-left font-bold text-sm'>About</p>
        <p className='text-base font-normal mt-2' style={{ color: '#101828' }}>
          Web3 startup with a team from all over the world. Need help with smart contracts? Launching NFT collections? come with us!
        </p>

        <div className='mt-4'>
          <p className='text-base font-normal' style={{ color: '#344054' }}>gm@pixel8labs.com</p>
          <p className='text-base font-normal' style={{ color: '#344054' }}>
            <span style={{ color: '#1D2939' }} className='font-bold text-base'>821.320 </span>
            profile visitor
          </p>
        </div>

        <div className='mt-10'>
          <p style={{ color: '#101828' }} className='text-left font-bold text-sm'>Latest Visitor</p>
          <div className='mt-2 flex gap-4 flex-wrap'>
            <Image src={'/image 4.png'} height={56} width={56} alt='Visitors' className='rounded-full'/>
            <Image src={'/image 4.png'} height={56} width={56} alt='Visitors' className='rounded-full'/>
            <Image src={'/image 4.png'} height={56} width={56} alt='Visitors' className='rounded-full'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
