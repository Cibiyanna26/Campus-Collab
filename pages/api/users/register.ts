// api/users/add.ts
'use server'


import { NextApiRequest, NextApiResponse } from 'next';
import UserModel from '@/models/userModel';
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed.' });
  }

  try {

    const { username, age, email,role, educationEndYear, departmentOfStudy, committeeBelonging, password } = req.body;

    // Validate input
    if (!username || !age || !email || !password) {
      return res.status(400).send({ message: 'All fields are mandatory.' });
    }

    // Hash password
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    const existingUser = await UserModel.findOne({$or:[{ username },{ email }]}).exec();

    if (existingUser) {
      return res.status(400).json({error:true, message: 'Email address already exists.' });
    }

    const newUser = new UserModel({
      username,
      age,
      email,
      role,
      educationEndYear,
      departmentOfStudy,
      committeeBelonging,
      password: password,
    });

    await newUser.save();
    
    return res.status(201).send({error:false, message: 'User successfully registered!' });
  } catch (error) {
    console.error('Error adding user:', error);
    return res.status(500).send({error:true, message: 'Internal Server Error.' });
  }
}