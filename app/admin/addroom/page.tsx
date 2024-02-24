'use client'
import BuildingBox from '@/components/BuildingBox';
import { useState, useEffect } from 'react'
import React from 'react'
import styles from './addroom.module.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const page = () => {
    const [hall, setHall] = useState('')
    const [hallid, setHallid] = useState('')
    const [details, setDetails] = useState('')
    const [floor, setFloor] = useState('')

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    await axios.post('http://localhost:3000/api/room-management/room', {
      roomName:hall,
      roomId:hallid,
      roomDetails:details,
      roomFloor:floor,
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
          <div className=''>
              <div className={styles.container}>
                  <div className={styles.main}>
                      <h1 className={styles.title}>
                          Welcome to <a href="">CampusCollab!</a>
                      </h1>

                      <form onSubmit={handleSubmit} className={styles.form}>
                          <input
                              type="text"
                              placeholder="Hall Name"
                              value={hall}
                              onChange={(e) => setHall(e.target.value)}
                              className={styles.input}
                          />
                          <input
                              type="text"
                              placeholder="Hall ID"
                              value={hallid}
                              onChange={(e) => setHallid(e.target.value)}
                              className={styles.input}
                          />
                          <textarea
                              placeholder="Hall Details"
                              value={details}
                              onChange={(e) => setDetails(e.target.value)}
                              className={styles.input}
                          />
                          <input
                              type="text"
                              placeholder="Hall Floor"
                              value={floor}
                              onChange={(e) => setFloor(e.target.value)}
                              className={styles.input}
                          />
                          <button type="submit" className={styles.button}>
                              Add
                          </button>
                          
                      </form>
                      <ToastContainer />
                  </div>
              </div>

          </div>
    </>
  )
}

export default page;

