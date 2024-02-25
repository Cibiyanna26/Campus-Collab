import Header from "@/components/Header"
import Link from "next/link"

export default function AddRoomLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <div className='overflow-y-auto relative h-full'>
        <header className='p-4 bg-[#164863] rounded-b-lg text-white'>
            <h1 className='text-2xl font-semibold'>Admin Dashboard</h1>
        </header>
        <main className='rounded-xl mt-4' >
            {children}
        </main>
        <div className='fixed bottom-0 w-[79rem]  p-4 rounded-t-lg bg-[#164863] text-white'>
                
                By Effitrack Developers @effitrack 
        </div>
    </div>
     
    </>
  )
}