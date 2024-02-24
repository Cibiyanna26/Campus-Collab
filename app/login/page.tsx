'use client'

import { useState, useEffect } from 'react'
import React from 'react'
import styles from './login.module.css'


const Page = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle sign-in logic here
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://sneat.com">CampusCollab!</a>
        </h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Remember Me
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