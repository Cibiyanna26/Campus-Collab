'use client'

import React, { useEffect, useState } from 'react'
import BuildingBox, { BoxInterface } from '@/components/BuildingBox';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Page = () => {

    const [rooms,setRoom] = useState([]);

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
        getAllRooms();
    })

    const getAllRooms = async () =>{
        const response = await axios.get('http://localhost:3000/api/room-management/room');
        setRoom(response.data.message)
    }


  return (
        <div className='grid grid-cols-4 gap-y-4'>
         
            {
                rooms  && rooms.map((room, index)=>{
                    return  <BuildingBox room ={room} key={index}/>
                })
            }
        
         </div>
  )
}

export default Page;