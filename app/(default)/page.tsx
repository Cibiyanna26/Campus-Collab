'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
const HOSTED_URL = process.env.HOSTED_URL as string;
const Page = () => {
    const router = useRouter();
    useEffect(()=>{
        router.push('/dashboard');
    })
  return (
    <>
    </>
  )
}

export default Page