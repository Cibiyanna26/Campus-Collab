import React from 'react'
import BuildingBox from '@/components/BuildingBox';
const page = () => {
  return (
    <div className='overflow-y-auto p-4'>
        <header className='p-4'>
            <h1 className='text-2xl font-semibold'>Dashboard</h1>
        </header>
        <main className='  border-gray-300 rounded-xl  border-2  p-4' >
          <div className='grid grid-cols-4 gap-y-4'>
            <BuildingBox/>
            <BuildingBox/>
            <BuildingBox/>
            <BuildingBox/>
            <BuildingBox/>
            <BuildingBox/>
            <BuildingBox/>
            <BuildingBox/>
            <BuildingBox/>
            <BuildingBox/>
            <BuildingBox/>
            <BuildingBox/>
            <BuildingBox/>
            <BuildingBox/>
            <BuildingBox/>
            <BuildingBox/>
            <BuildingBox/>
            <BuildingBox/>
            <BuildingBox/>
            <BuildingBox/>
            <BuildingBox/>
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

export default page;