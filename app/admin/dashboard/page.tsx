'use client'

import React, { useEffect, useState } from 'react'
import BuildingBox, { BoxInterface } from '@/components/BuildingBox';
import axios from 'axios';

const page = () => {

    const [rooms,setRoom] = useState([]);

    useEffect(()=>{
        getAllRooms();
    },[])

    const getAllRooms = async () =>{
        const response = await axios.get('http://localhost:3000/api/room-management/room');
        setRoom(response.data.message)
    }


  return (
        <div className='grid grid-cols-4 gap-y-4'>
         
            {
                rooms  && rooms.map((room)=>{
                    return  <BuildingBox room ={room}/>
                })
            }
        
         </div>
  )
}

export default page;