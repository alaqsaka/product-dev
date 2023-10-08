import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import {redirect, useSearchParams} from 'next/navigation';
import { useRouter } from 'next/router';
import RepoCard from '@/components/RepoCard';
import Profile from '@/components/profile';



const Home: NextPage = (props) => {
  const [data, setData] = useState('');
  const router = useRouter();
  const username = router.query.username as string;
  const searchParams = useSearchParams()
  const code = searchParams.get('code');
  console.log(code);
  console.log('data home ', data);

  useEffect(() => {
    console.log('use effect');
    const token = localStorage.getItem('token');

    if (token) {
      setData(token);
      console.log('ada token')
    } else {
      if (code){
        console.log('fetching data');
        const fetchData = async () => {
          const response = await fetch(`/api/github/access_token?code=${code}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          const result = await response.json()
          setData(result.access_token);
          console.log('result ', result);
          localStorage.setItem('token', result.access_token);
          redirect('/octocat');
        }

        fetchData().catch((e) => {
          // handle the error as needed
          console.error('An error occurred while fetching the data: ', e)
        })
      }
    }
  }, [code]);

  return (
   <div className='lg:px-[112px] lg:py-[24px] bg-white lg:bg-slate-100 min-h-screen'>
    {username}
   {data ? (
    <>
     <div className='lg:grid grid-cols-12 gap-14'>
      <div className='col-span-2 px-4 py-6 lg:px-0 lg:py-0'>
        <Profile token={data} username={username}/>
      </div>
      <div className='col-span-10 bg-white border p-[24px] lg:p-[24px]' style={{ borderColor: '#F2F4F7' }}>
        <div className='flex items-center'>
          <p className='text-[24px] font-bold mr-3'>Repository</p>
          <div className='px-3 py-1 rounded-full' style={{ backgroundColor: '#F8F9FC' }}>
            <p className='text-sm font-medium' style={{  color: '#363F72' }}>6</p>
          </div>
        </div>
        <div className='mt-6'>
          <RepoCard/>
        </div>
      </div>
    </div>
    </>
   ) :
   <p>You must login first.</p>}
   </div>
  );
};

// export async function getServerSideProps(context: any) {
//   const {code} = context.query;

//   if (code) {
//     let res = await fetch(`${process.env.API_URL}/api/github/access_token?code=${code}`);
//     let token = await res.json();
//     return {
//       props: {
//         data: {
//           ...token
//         }
//       }
//     }
//   }

//   return {
//     props: { message: `Next.js is awesome`, code: code ? code : null },
//   }
// }

export default Home;