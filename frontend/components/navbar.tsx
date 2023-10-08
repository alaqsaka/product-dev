import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from './button';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = ({token}: {token: string}) => {
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const [showModalMobile, setShowModalMobile] = useState(false);

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

  const toggleProfileDataMobile = () => {
    console.log('toggle')
    setShowModalMobile(prev => !prev);
  };


  return (
    <>
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
              <div className='hidden lg:block mt-1 absolute bg-white border  rounded-md shadow-md right-[90px]' style={{ borderColor: '#F2F4F7' }}>
                <div className='flex gap-3 px-4 py-2'>
                <Image className='rounded-full' src={profileData?.avatar_url} height={40} width={40} alt='Profile Picture'/>
                <div>
                  <p style={{ color: '#344054' }} className='text-sm font-semibold'>{profileData?.login}</p>
                  <p style={{ color: '#667085' }} className='text-xs'>{profileData?.email}</p>
                  </div>
                </div>

                <div onClick={() => router.push(`/${profileData?.login}`)} className='cursor-pointer border border-b-2 py-[10px] px-4' style={{ borderColor: '#F2F4F7' }}>View Profile</div>
                <div onClick={() => {
                  localStorage.removeItem('token');
                  router.reload()
                }} className='cursor-pointer my-[10px] cursor-pointer px-4' style={{ borderColor: '#F2F4F7' }}>Logout</div>
              </div>
            )}
          </div>
         : (
          <div>
            <div className='lg:hidden'>
              <Image className='cursor-pointer' onClick={toggleProfileDataMobile} alt='Burger' src={'/burger.svg'} height={20} width={20}/>
            </div>

            <Link className='hidden lg:block' href={`/api/github/auth`}>
              <Button variant='primary'>
              Login with Github
              </Button>
            </Link>
          </div>
        )
        }
    </div>

     {showModalMobile && (
      <div className='py-6 px-4 md:hidden absolute bg-white w-full min-h-screen'>
          <button onClick={() => router.push(`/api/github/auth`)}  className='text-white w-full font-semibold bg-pink-500 rounded-md py-2.5 px-[18px] text-base'>
            Login with Github
          </button>
        </div>
     )}

     {showModal && (
      <div className='lg:hidden absolute bg-white w-full min-h-screen'>
        <div>
        <div className='flex gap-3 px-4 py-2 items-center'>
                <Image className='rounded-full' src={profileData?.avatar_url} height={64} width={64} alt='Profile Picture'/>
                <div>
                  <p style={{ color: '#344054' }} className='text-base font-semibold'>{profileData?.login}</p>
                  <p style={{ color: '#667085' }} className='text-sm'>{profileData?.email}</p>
                  </div>
                </div>

                <div onClick={() => router.push(`/${profileData?.login}`)} className='cursor-pointer border border-b-2 py-[10px] px-4 text-base font-bold' style={{ borderColor: '#F2F4F7' }}>View Profile</div>
                <div onClick={() => {
                  localStorage.removeItem('token');
                  router.reload()
                }} className='cursor-pointer my-[10px] px-4 text-base font-bold' style={{ borderColor: '#F2F4F7' }}>Logout</div>
        </div>
      </div>
     )}
    </>
  )
}

export default Navbar
