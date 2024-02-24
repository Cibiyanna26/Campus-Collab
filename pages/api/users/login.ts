import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB, disconnectDB } from '@/models/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Your logic here
  const method = req.method;
  
  switch (method) {
    case "GET":{
      await connectDB();
      return res.status(200).json({ name: "John Doe" });
    }
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}