'use client'

import { useState, useEffect } from 'react'
import React from 'react'
import styles from './signup.module.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
const HOSTED_URL = process.env.NEXT_PUBLIC_HOSTED_URL as string;
const Page = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [department, setDepartment] = useState('');
  const [commitee, setCommitee] = useState('')
  const [passoutyear, setPassoutYear] = useState('')

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    await axios.post(`${HOSTED_URL}/api/users/register`, {
      email: email,
      username: username,
      age: 1,
      role: 'Student',
      password: password,
      departmentOfStudy: department,
      committeeBelonging: commitee,
      educationEndYear: passoutyear
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'will be added later'
      }
    }).then((response) => {
      router.push('/login');
    }).catch((error) => {
      //add toast to display the error message
      toast.error(error.response.data.message);
    
    })
  }
  const router = useRouter();

  const handleOptionChange = (event: any) => {
    setDepartment(event.target.value);
  };

  const handleCommitte = (event: any) => {
    setCommitee(event.target.value);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="">CampusCollab!</a>
        </h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <select value={department} onChange={handleOptionChange} className='h-10 p-2'>
            <option value="">Select your department</option>
            <option value="option1">Computer Science</option>
            <option value="option2">AI ML</option>
            <option value="option2">AI DS</option>
            <option value="option2">Mechanical</option>
            <option value="option2">Electrical and Communication</option>
          </select>
          <input
            type="number"
            placeholder="Passedout year"
            value={passoutyear}
            onChange={(e) => setPassoutYear(e.target.value)}
            className={styles.input}
          />
          <select value={commitee} onChange={handleCommitte} className='h-10 p-2'>
            <option value="">Select your Commitee</option>
            <option value="option1">Cultural</option>
            <option value="option2">Technical</option>
            <option value="option2">Placement</option>
            <option value="option2">Higher Education</option> 
            <option value="option2">NCC / NSS</option>
          </select>
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
            Remember Me
          </label>
          <button type="submit" className={styles.button}>
            SIGN UP
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
        <ToastContainer/>
      </main>
    </div>
  )
}

export default Page