import type { NextApiRequest, NextApiResponse } from 'next'

export default async function  handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {code} = req.query;
  try {
    let data;
    const fetchToken = await fetch(`https://github.com/login/oauth/access_token?client_id=${process.env.NEXT_CLIENT_ID}&client_secret=${process.env.NEXT_CLIENT_SECRET}&code=${code}&redirect_uri=${process.env.REDIRECT_URI}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      }
    }).then(async (response) => {
      data = await response.json();
      res.status(200).json(data);
    })
    .catch(()=>{})

  } catch (error) {
    console.error('[ERROR ACCESS TOKEN API]', error)
  }
}
