'use client'

import { useState, useEffect } from 'react'
import styles from './addroom.module.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
const HOSTED_URL = process.env.NEXT_PUBLIC_HOSTED_URL as string;
const Page = () => {
    const [hall, setHall] = useState('')
    const [hallid, setHallid] = useState('')
    const [details, setDetails] = useState('')
    const [floor, setFloor] = useState('')

    const router = useRouter();
    const checkUser = async () =>{
      try{
        const response = await axios.get(`${HOSTED_URL}/api/CheckUser`);
        if(response.data.message.role === 'Student'){
          router.push('/dashboard');
        }
      }
      catch(error){

        router.push('/login');
      }
    }

    useEffect(()=>{
      checkUser();
    })

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    await axios.post(`${HOSTED_URL}api/room-management/room`, {
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

      toast.success(response.data.message)
    }).catch((error) => {
      //add toast to display the error message
      toast.error(error.response.data.message);
  
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

export default Page;

