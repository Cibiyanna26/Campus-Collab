'use client'

import React from 'react'
import BuildingBox from '@/components/BuildingBox';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [rooms,setRoom] = useState([]);
  const router = useRouter();
  const checkUser = async () =>{
    try{
      const response = await axios.get('http://localhost:3000/api/CheckUser');
      if(response.data.message.role !== 'Student'){
        router.push('/admin/dashboard');
      }
    }
    catch(error){
      console.log(error);
      router.push('/login');
    }
  }

  useEffect(()=>{
      async ()=>{
        checkUser();
      }
      getAllRooms();
  })

  const getAllRooms = async () =>{
    try{
      const response = await axios.get('http://localhost:3000/api/room-management/room');
      setRoom(response.data.message)
    }
     catch(e : any){
      console.log(e.response.data.message);
     }

  }
  return (
    <div className='overflow-y-auto p-4'>
        <header className='p-4'>
            <h1 className='text-2xl font-semibold'>Dashboard</h1>
        </header>
        <main className='  border-gray-300 rounded-xl  border-2  p-4' >
          <div className='grid grid-cols-4 gap-y-4'>
            {

                rooms  && rooms.map((room, index)=>{
                    return  <BuildingBox room ={room} key={index}/>
                })
            }
          </div>
        </main>
        <footer className='p-2 rounded-xl'>
            <div>
              By Effitrack Developers @effitrack 
            </div>
        </footer>
    </div>
  )
}

export default Page;