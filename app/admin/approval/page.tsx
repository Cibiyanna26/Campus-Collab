'use client'


import React, { useEffect, useState } from 'react'
import BuildingBox from '@/components/BuildingBox';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import styles from '@/app/admin/addroom/addroom.module.css'
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
  const [requestBook,setRequestBook] = useState([]);
  useEffect(()=>{
    addNewBooking();
  },[])

  useEffect(()=>{
    console.log(requestBook)
  },[requestBook])


  async function addNewBooking(){
    try{
      const response = await axios.get('http://localhost:3000/api/room-management/booking');
      // setRequestBook(response.data.message);
      const data = response.data.message;
      const nonbookarray = data.filter((d : any)=>{
        if(d.approval === 'Pending'){
          return true;
        }else{
          return false;
        }
      })
      setRequestBook(nonbookarray);
    } catch(e){
      setRequestBook([]);
    }
  }


  return (
    <>
        <div className=''>
            <h1 className='text-2xl font-bold'>Requests Received</h1>
            <div className='p-4 rounded-xl flex flex-col gap-y-4'>

              {
                requestBook && requestBook.map((singleReq : any,index)=>{

                  async function approveRequest(){
                    try{
                      const response = await axios.post('http://localhost:3000/api/room-management/approval',
                      {
                        roomId:singleReq.roomId,
                        eventDate:singleReq.eventDate,
                        bookingHour:singleReq.bookingHour,
                        bookingPerson:singleReq.bookingPerson,
                      },
                      {
                        headers:{
                          'Content-Type':'application/json'
                        }
                      }
                      
                      );
                      const newarray = requestBook.filter((book : any)=>{
                        if(book.roomId === singleReq.roomId && book.bookingHour === singleReq.bookingHour && book.bookingPerson === singleReq.bookingPerson && book.eventDate === singleReq.eventDate){
                          return false;
                        }
                        return true;
                      })
                      setRequestBook(newarray);
                      toast.success(response.data.message);
                    } catch(e :  any){
                      toast.error(e.response.data.message);
                    }
                  }
                  async function deleteRequest(){
                    try{
                      const response = await axios.delete('http://localhost:3000/api/room-management/approval',
                      {
                        params: {
                          roomId: singleReq.roomId,
                          eventDate: singleReq.eventDate,
                          bookingHour: singleReq.bookingHour,
                          bookingPerson: singleReq.bookingPerson,
                        },
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      }
                      
                      );
                      const newarray = requestBook.filter((book : any)=>{
                        if(book.roomId === singleReq.roomId && book.bookingHour === singleReq.bookingHour && book.bookingPerson === singleReq.bookingPerson && book.eventDate === singleReq.eventDate){
                          return false;
                        }
                        return true;
                      })
                      setRequestBook(newarray);
                      toast.success(response.data.message);
                    } catch(e :  any){
                      toast.error(e.response.data.message);
                    }
                  }

                    return (<>
                          <div className='p-4 bg-gray-200 rounded-xl border-2 border-gray-400 grid grid-cols-2 gap-4'>
                            <p> <span className='font-semibold'>Booking Person :</span> {singleReq.bookingPerson}</p>
                            <p> <span className='font-semibold'>Room Id :</span> {singleReq.roomId}</p>
                            <p><span className='font-semibold'>Requesting Period :</span> {singleReq.bookingHour}</p>
                            <p><span className='font-semibold'>Date :</span> {singleReq.eventDate} </p>
                            <p><span className='font-semibold'>Booking Details :</span> {singleReq.bookingPurpose}</p>
                            <div className='flex flex-row gap-x-4'>
                              <button className='bg-green-500 rounded-xl p-3 w-[7rem] text-white' onClick={approveRequest}>Approve</button>
                              <button className='bg-red-500 rounded-xl p-3 w-[7rem] text-white' onClick={deleteRequest}>Decline</button>
                            </div>
                         
                          </div>
                    </>)
                })
              }
              <ToastContainer />
            </div>
        </div>
    </>
  )
}

export default Page;