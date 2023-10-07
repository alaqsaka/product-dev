import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    return res.redirect(307, `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=user&login`);
  } catch (error) {

  }

  res.status(200).json({ message: 'Hello from Next.js!' })
}
