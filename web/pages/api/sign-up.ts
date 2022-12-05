import type { NextApiRequest, NextApiResponse } from 'next';
import { Request } from '~/utils/request';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const request = new Request(process.env.NEXT_PUBLIC_API_BASE_URL!!);
  if (req.method === 'POST') {
    try {
      const { idToken, nickname, profile } = req.body;

      await request.instance.post('/sign-up', {
        token: idToken,
        nickname,
        profile,
      });
      res.status(200).send('success');
    } catch (err: any) {
      res.status(err.statusCode).send(err.message);
    }
  }
}
