'use client'

import { useState, useEffect } from 'react'
import React from 'react'
import styles from './signup.module.css'


const Page = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [department, setDepartment] = useState('');
  const [commitee, setCommitee] = useState('')
  const [passoutyear, setPassoutYear] = useState('')

  const handleSubmit = (e: any) => {
    e.preventDefault()
    // Handle sign-in logic here
  }

  const handleOptionChange = (event: any) => {
    setDepartment(event.target.value);
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
          <select value={department} onChange={handleOptionChange} className='h-10 p-2'>
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
      </main>
    </div>
  )
}

export default Page