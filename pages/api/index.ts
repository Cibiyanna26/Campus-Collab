import type { NextApiRequest, NextApiResponse } from 'next';
import { authenticateMiddleware } from '@/service/user.service';
import { connectDB } from '@/models/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Your logic here
  const method = req.method;
  
  
  switch (method) {
    case "GET":
      await connectDB();
      
      // await authenticateMiddleware(req , res, async () => {
      //   return res.status(200).json({ message: 'Secure route accessed' });
      // });

    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}