import type { NextApiRequest, NextApiResponse } from 'next';
import UserModel from '@/models/userModel';
import { generateJWT } from '@/service/user.service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Your logic here
  const method = req.method;
  
  if (method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed.' });
  }

  try{
    const {username,password} = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'All fields are mandatory.' });
    }

    const existingUser = await UserModel.findOne({ username }).exec();

    if (!existingUser) {
      return res.status(400).json({error:true, message: 'username doesn"t exist' });
    }
    const dbpassword :string = existingUser.password;
    if(dbpassword !== password){
      return res.status(400).json({error:true,message:'password is not correct'});
    }
    const email : string= existingUser.email;
    const accessToken = generateJWT({username,email});
    console.log(accessToken)

    return res.status(200).json({error:false,message:"Login Successfull",accessToken});


  }catch(e){
    res.status(409).json({error:true,message:"Internal server error"})
  }
}