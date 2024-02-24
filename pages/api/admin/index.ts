import type { NextApiRequest, NextApiResponse } from 'next';
import { authenticateMiddleware } from '@/service/user.service';
import { connectDB } from '@/models/db';
import UserModel from '@/models/userModel';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Your logic here
  const method = req.method;
 
  switch(method){
    case 'GET':

    case 'POST':
      try{
          const { username, age, email,role, password } = req.body;
          const educationEndYear=null, departmentOfStudy=null, committeeBelonging=null;
          if (!username || !age || !email || !password) {
            return res.status(400).send({ message: 'All fields are mandatory.' });
          }
          const existingUser = await UserModel.findOne({$or:[{ username },{ email }]}).exec();
          if (existingUser) {
            return res.status(400).json({error:true, message: 'Email address already exists.' });
          }
          if(role === 'Student') return res.status(401).json({error:true,message:'Student are not allowed'})
          const newUser = new UserModel({
            username,
            age,
            email,
            role,
            educationEndYear,
            departmentOfStudy,
            committeeBelonging,
            password,
          });
          await newUser.save();
          return res.status(201).send({error:false, message: 'User successfully registered!' });
      }
      catch (error) {
        console.error('Error adding user:', error);
        return res.status(500).send({error:true, message: 'Internal Server Error.' });
      }
  
    }
}