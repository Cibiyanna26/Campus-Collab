'use client'

import { useState, useEffect } from 'react'
import React from 'react'
import styles from './login.module.css'
import axios from 'axios'
import { useRouter } from 'next/navigation'


const HOSTED_URL = process.env.NEXT_PUBLIC_HOSTED_URL as string;

const Page = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const userUrl = `${HOSTED_URL}/api/users/login`;
    console.log(HOSTED_URL)
    const adminUrl = `${HOSTED_URL}/api/admin/login`;
    
    const response = await axios.post((rememberMe)?adminUrl:userUrl, 
      { 
        username, 
        password
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
      )
      if(response.data.role === 'Student'){
        router.push('/dashboard');
      }
      if(response.data.role !== 'Student'){
        router.push('/admin/dashboard');
      }
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="">CampusCollab!</a>
        </h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="UserName"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className={styles.checkbox}
            />
            Admin Login
          </label>
          <button type="submit" className={styles.button}>
            SIGN IN
          </button>
        </form>

        <p className={styles.text}>
          New on our platform?{' '}
          <a href="/signup" className={styles.link}>
            Create an account
          </a>
        </p>
        <p className={styles.text}>
          <a href="/forgot-password" className={styles.link}>
            Forgot Password?
          </a>
        </p>
      </main>
    </div>
  )
}

export default Page