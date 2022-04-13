import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
 name: string;
};

export default function handler(
 req: NextApiRequest,
 res: NextApiResponse<Data>
) {
 if (req.method === 'GET') {
  console.log(req.query.method);
  res.status(200).json({ name: req.query.hash.toString() || 'fd' });
 } else if (req.method === 'POST') {
 }
}
