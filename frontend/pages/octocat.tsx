import type { NextPage } from 'next';



const Home: NextPage = (props) => {
  console.log('home props ', props)

  return (
   <div>
    Octocat Homepage
   </div>
  );
};

export async function getServerSideProps(context: any) {
  const {code} = context.query;

  if (code) {
    let res = await fetch(`http://localhost:3000/api/github/access_token?code=${code}`);
    let token = await res.json();
    return {
      props: {
        data: {
          ...token
        }
      }
    }
  }

  return {
    props: { message: `Next.js is awesome`, code: code ? code : null },
  }
}

export default Home;
