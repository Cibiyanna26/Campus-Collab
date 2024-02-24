import Header from "@/components/Header"
import Link from "next/link"

export default function AddRoomLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <div className='overflow-y-auto p-4'>
        <header className='p-4'>
            <h1 className='text-2xl font-semibold'>Admin Add room</h1>
        </header>
        <main className='  border-gray-300 rounded-xl  border-2  p-4' >
            {children}
        </main>
        <footer className='p-2 rounded-xl bottom-0 absolute'>
            <div>
              By Effitrack Developers @effitrack 
            </div>
        </footer>
    </div>
     
    </>
  )
}