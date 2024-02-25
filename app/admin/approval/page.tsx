'use client'

import React from 'react'
import BuildingBox from '@/components/BuildingBox';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import axios from 'axios';

const Page = () => {

  const router = useRouter();
  const checkUser = async () =>{
    try{
      const response = await axios.get('http://localhost:3000/api/CheckUser');
      if(response.data.message.role === 'Student'){
        router.push('/dashboard');
      }
    }
    catch(error){
      console.log(error);
      router.push('/login');
    }
  }

  useEffect(()=>{
    checkUser();
  })

  return (
    <>
        <div className='grid grid-cols-4 gap-y-4'>
            
        </div>
    </>
  )
}

export default Page;