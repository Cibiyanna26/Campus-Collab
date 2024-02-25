'use client'

import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
const HOSTED_URL = process.env.NEXT_PUBLIC_HOSTED_URL as string;
const Page = () => {

    const [approvedBooking,setApprovedBookings] = useState([]);

  useEffect(()=>{
      getAllRooms();
  },[])

  const getAllRooms = async () =>{
    try{
      const response = await axios.get(`${HOSTED_URL}/api/room-management/booking`);
        const approved = response.data.message.filter((d : any)=>{
            if(d.approval === 'Approved'){
                return true;
            }
            return false;
        })
        setApprovedBookings(approved);
    }
     catch(e : any){
      console.log(e.response.data.message);
     }

  }
  return (
    <div className='overflow-y-auto p-4'>
        <header className='p-4'>
            <h1 className='text-2xl font-semibold'>Booked Room and Timing</h1>
        </header>
        <main className=' rounded-xl ' >
          <div className=''>
            {
                approvedBooking && approvedBooking.map((booked : any)=>{
                    return<>
                        <div className='p-4 bg-[#B4D4FF] rounded-xl  grid grid-cols-2 gap-4 my-4 shadow-xl hover:shadow-none duration-200 ease-in'>
                            <p> <span className='font-semibold'>Booking Person :</span> {booked.bookingPerson}</p>
                            <p> <span className='font-semibold'>Room Id :</span> {booked.roomId}</p>
                            <p><span className='font-semibold'>Requesting Period :</span> {booked.bookingHour}</p>
                            <p><span className='font-semibold'>Date :</span> {booked.eventDate} </p>
                            <p><span className='font-semibold'>Booking Details :</span> {booked.bookingPurpose}</p>
                            <p className='px-3 py-2 rounded-xl bg-[#427D9D] w-[7rem] text-white'>Booked</p>
                          </div>
                    </>
                })
            }
          </div>
        </main>
    </div>
  )
}

export default Page;