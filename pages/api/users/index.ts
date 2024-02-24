import { connectDB } from '@/models/db';
import type { NextApiRequest, NextApiResponse } from 'next';
import { authenticateMiddleware,userDetailsFromToken , UserPayload } from '@/service/user.service';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Your logic here
  const method = req.method;
  
  switch (method) {
    case "GET":
      await authenticateMiddleware(req,res,()=>{
        const token = req.cookies.token as string;
        const tokenDetials = userDetailsFromToken(token) as UserPayload;
        return res.status(200).json({error:false,tokenDetials,username:tokenDetials.username})
      })
    
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}