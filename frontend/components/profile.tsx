import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const Profile = ({token, username}: {token: string, username?: string}) => {
  console.log('profile token', token);
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {

    const fetchProfileData = async () => {
      const response = await fetch(`https://api.github.com/users/${username}`, {
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
      if (profileData==null) {
        setError(e)
      }
      console.error('An error occurred while fetching the data: ', e)
      setLoading(false);
    })
    setLoading(true);
    console.log('loading ',loading);
  }, [username, token])


  return (
  <>
    {loading ? <p className='font-bold'>Loading...</p> :
     (
      <>
        {profileData == null ? <p>Profile Error</p> :
          (
            <div className='items-center flex flex-col'>
              <div>
              <Image src={profileData?.avatar_url} height={160} width={160} alt='Profile Photo'/>

              <div className='text-center mt-2'>
                <p className='font-bold md:text-[24px]' style={{ color: '#101828' }}>{profileData?.name}</p>
                <p className='md:text-base' style={{ color: '#344054' }}>@{profileData?.login}</p>
              </div>
              </div>

              <div className='mt-6 w-full'>
                <p style={{ color: '#101828' }} className='text-left font-bold text-sm'>About</p>
                <p className='text-base font-normal mt-2' style={{ color: '#101828' }}>
                {profileData?.bio}
                </p>

                <div className='flex gap-1 mt-2'>
                  <p>
                    <span className='font-bold mr-1'>{profileData?.followers}</span>Followers
                  </p>
                  <p>
                    <span className='font-bold mr-1'>{profileData?.following}</span>Following
                  </p>
                </div>

                <div className='mt-4'>
                  <p className='text-base font-normal' style={{ color: '#344054' }}>{profileData?.email}</p>
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
      </>
     )
    }
  </>
  )
}

export default Profile
