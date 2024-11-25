import { cors } from '@/app/lib/cors';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (cors(req, res)) return; // Handle OPTIONS request

  // Your API logic here
  res.status(200).json({ session: null }); // Example response
}
