'use client'

import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
const { HOSTED_URL} = process.env;
const Page = () => {

    const [approvedBooking,setApprovedBookings] = useState([]);

  useEffect(()=>{
      getAllRooms();
  },[])

  const getAllRooms = async () =>{
    try{
      const response = await axios.get(`${HOSTED_URL}/api/room-management/booking`);
      console.log(response)
        const approved = response.data.message.filter((d : any)=>{
            if(d.approval === 'Approved'){
                return true;
            }
            return false;
        })
        console.log(approved);
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
        <main className='  border-gray-300 rounded-xl  border-2  p-4' >
          <div className=''>
            {
                approvedBooking && approvedBooking.map((booked : any)=>{
                    return<>
                        <div className='p-4 bg-gray-200 rounded-xl border-2 border-gray-400 grid grid-cols-2 gap-4 my-4'>
                            <p> <span className='font-semibold'>Booking Person :</span> {booked.bookingPerson}</p>
                            <p> <span className='font-semibold'>Room Id :</span> {booked.roomId}</p>
                            <p><span className='font-semibold'>Requesting Period :</span> {booked.bookingHour}</p>
                            <p><span className='font-semibold'>Date :</span> {booked.eventDate} </p>
                            <p><span className='font-semibold'>Booking Details :</span> {booked.bookingPurpose}</p>
                            <p className='px-3 py-2 rounded-xl bg-green-400 w-[7rem] text-white'>Booked</p>
                          </div>
                    </>
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