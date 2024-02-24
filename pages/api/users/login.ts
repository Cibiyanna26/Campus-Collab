import type { NextApiRequest, NextApiResponse } from 'next';
import UserModel from '@/models/userModel';
import { generateJWT, getTokenDetails } from '@/service/user.service';
import { error } from 'console';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Your logic here
  const method = req.method;
  
  if (method !== 'POST') {
    return res.status(405).send({ error: true, message: 'Only POST requests allowed.' });
  }

  try{
    const {username,password} = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: true, message: 'All fields are mandatory.' });
    }

    const existingUser = await UserModel.findOne({ username }).exec();

    if (!existingUser) {
      return res.status(400).json({error:true, message: 'username doesn"t exist' });
    }

    const email : string = existingUser.email;
    const role : string = existingUser.role;
    const dbpassword :string = existingUser.password;

    if(dbpassword !== password){
      return res.status(400).json({error:true,message:'password is not correct'});
    }
    if(role !== 'Student') return res.status(400).json({error:true,message:'You are not allowed'})
    const accessToken = generateJWT({username,email,role});
    // const tokenDetials = getTokenDetails(accessToken);
    res.setHeader('Set-Cookie', [
      `token=${accessToken}; HttpOnly; Path=/; Max-Age=${process.env.COOKIE_EXPIRE_TIME}`,
      `loggedIn=true; Max-Age=${process.env.COOKIE_EXPIRE_TIME}`,
      `role=${role};HttpOnly; Path=/; Max-Age=${process.env.COOKIE_EXPIRE_TIME}`,
    ])
    return res.status(200).json({error:false,accessToken,username,role});


  }catch(e){
    res.status(409).json({error:true,message:"Internal server error"})
  }
}