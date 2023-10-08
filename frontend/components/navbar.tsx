import React, { useEffect, useState } from 'react';
import Button from './button';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = ({token}: {token: string}) => {
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      const response = await fetch(`https://api.github.com/user`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const result = await response.json();
      setProfileData(result);

      console.log('Fetch Profile Data ', result);
      setLoading(false);
    }


    fetchProfileData()
    .catch((e) => {
      console.log('Error ',e);
      console.error('An error occurred while fetching the data: ', e)
      setLoading(false);
    })
    setLoading(true);
    console.log('loading ',loading);
  }, [token]);

  const toggleProfileData = () => {
    console.log('toggle')
    setShowModal(prev => !prev);
  };

  return (

    <div className='border-b py-[10px] px-[16px] md:py-[14px] md:px-[80px] flex justify-between items-center'>
      <div className='text-lg font-bold'>
        Simple<span style={{ color: '#DD2590' }}>.</span>Repo
      </div>

      {
        token ?
          <div>
            <div  className=' border rounded-full px-4 py-2 flex h-[56px] w-[112px] gap-4' style={{ borderColor: '#D0D5DD' }}>
              <Image className='rounded-full' src={profileData?.avatar_url} height={40} width={40} alt='Profile Picture'/>
              <Image onClick={toggleProfileData} className='cursor-pointer' src={'/burger.svg'} height={24} width={24} alt='Dropdown'/>
            </div>

            {showModal && (
              <div className='mt-1 absolute bg-white border  rounded-md shadow-md right-[90px]' style={{ borderColor: '#F2F4F7' }}>
                <div className='flex gap-3 px-4 py-2'>
                <Image className='rounded-full' src={profileData?.avatar_url} height={40} width={40} alt='Profile Picture'/>
                <div>
                  <p style={{ color: '#344054' }} className='text-sm font-semibold'>{profileData?.login}</p>
                  <p style={{ color: '#667085' }} className='text-xs'>{profileData?.email}</p>
                  </div>
                </div>

                <div className='border border-b-2 py-[10px] px-4' style={{ borderColor: '#F2F4F7' }}>View Profile</div>
                <div className='my-[10px] cursor-pointer px-4' style={{ borderColor: '#F2F4F7' }}>Logout</div>
              </div>
            )}
          </div>
         : (
          <Link href={`/api/github/auth`}>
            <Button variant='primary'>
              Login with Github
            </Button>
        </Link>
        )
        }
    </div>
  )
}

export default Navbar
