'use client'
import BuildingBox from '@/components/BuildingBox';
import { useState, useEffect } from 'react'
import React from 'react'
import styles from './booking.module.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface BookingStruct {
    roomId:string;
    eventDate:string;
    bookingPerson:string;
    period:number;
    setShow:Function,
}

const HOSTED_URL = process.env.HOSTED_URL as string;

const Booking = (props : BookingStruct) => {
    const {roomId, eventDate, bookingPerson,period, setShow} = props;
    const [bookingPurpose, setBookingPurpose] = useState('')


  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const array = [0,0,0,0,0,0,0];
    array[period] = 1;
    await axios.post(`${HOSTED_URL}/api/room-management/booking`, {
      roomId,
      eventDate,
      bookingHour:array,
      bookingPerson,
      bookingPurpose
    },
    {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      console.log(response);
      toast.success(response.data.message)
    }).catch((error) => {
      //add toast to display the error message
      toast.error(error.response.data.message);
      
      console.log(error.response.data.message);
    })
  }

  return (
    <>
          <div className=' rounded-xl border-2 border-gray-400 relative'>
            <button onClick={()=>setShow(false)} className='absolute top-4 right-4 rounded-xl text-xl font-semibold'>
                X
            </button>
              
              <div className={styles.container}>
                  <div className={styles.main}>
                      <h1 className={styles.title}>
                          Welcome to <a href="">CampusCollab!</a>
                      </h1>

                      <form onSubmit={handleSubmit} className={styles.form}>
                          <input
                              type="text"
                              placeholder="Room Id"
                              value={roomId}
                              className={styles.input} readOnly
                          />
                          <input
                              type="text"
                              placeholder="Booking Person"
                              value={bookingPerson}
                              readOnly
                              className={styles.input}
                          />
                          <textarea
                              placeholder="Hall Details"
                              value={bookingPurpose}
                              onChange={(e) => setBookingPurpose(e.target.value)}
                              className={styles.input}
                          />
                          <input
                              type="text"
                              placeholder="Event Date"
                              value={eventDate}
                              className={styles.input} readOnly
                          />
                          <input
                              type="text"
                              placeholder="Hall Floor"
                              value={period+1}
                              className={styles.input} readOnly
                          />
                          <button type="submit" className={styles.button}>
                              Request for Booking
                          </button>
                          
                      </form>
                      <ToastContainer />
                  </div>
              </div>

          </div>
    </>
  )
}

export default Booking;

