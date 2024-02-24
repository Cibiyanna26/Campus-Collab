import { NextApiRequest, NextApiResponse } from "next";
import { userDetailsFromToken , UserPayload } from '@/service/user.service';

export default async function handler (req: NextApiRequest,res: NextApiResponse){
    const token = req.cookies.token as string;
    const tokenDetials = userDetailsFromToken(token) as UserPayload;
    return res.status(200).json({error:false,message: tokenDetials})
}