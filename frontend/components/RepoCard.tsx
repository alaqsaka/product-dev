import React, { useEffect, useState } from 'react'

const RepoCard = ({token, username}: {token: string, username?: string}) => {
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState(null);
  const [usersRepo, setUsersRepo] = useState<any>(null);

  useEffect(() => {
    const fetchUsersRepo = async () => {
      const response = await fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const result = await response.json();
      setUsersRepo(result);
      setLoading(false);
    }


    fetchUsersRepo()
    .catch((e) => {
      if (usersRepo==null) {
        setError(e)
      }
      console.error('An error occurred while fetching the data: ', e)
      setLoading(false);
    })
    setLoading(true);
  }, [username, token])



  return (
    <>
    {loading && <p className='font-bold'>Loading...</p>}
    {!loading && !usersRepo ? <p>Error Fetch Users Repo</p> : (
      <div >
        <div className='mb-6'>
          <div className='flex items-center'>
            <p className='text-[24px] font-bold mr-3'>Repository</p>
            <div className='px-3 py-1 rounded-full' style={{ backgroundColor: '#F8F9FC' }}>
              <p className='text-sm font-medium' style={{  color: '#363F72' }}>{usersRepo?.length}</p>
            </div>
          </div>
        </div>
        {usersRepo?.slice(0, 6).map((repo: any) => (
          <div key={repo.id} className='p w-full p-6 border mb-6' style={{ borderColor: '#EAECF0', backgroundColor: '#F9FAFB' }}>
            <div className='flex gap-2'>
              <p className='text-[16px] font-bold' style={{ color: '#101828' }}>{repo?.name}</p>
              <div className='px-2 py-[2px] w-fit rounded-lg' style={{ backgroundColor: '#F4F3FF' }}>
                <p style={{ color: '#5925DC' }} className='font-medium text-xs'>public</p>
              </div>
            </div>
            <div className='mt-2'>
              <p className='text-sm font-normal' style={{ color: '#101828' }}>{repo?.description}</p>
              <div className='flex gap-6 items-center mt-6'>
                {repo?.language && (
                  <div className='flex gap-2 items-center'>
                    <div className='rounded-full' style={{ backgroundColor: '#B42318', height: 12, width: 12 }}></div>
                    <p  style={{ color: '#101828' }} className='text-xs'>
                      {repo?.language}
                    </p>
                  </div>
                )}
                <p style={{ color: '#475467' }} className='text-xs'>Updated {new Date(repo?.updated_at).toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </>
  )
}

export default RepoCard
