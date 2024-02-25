export default function HallidLayout({children}:{children: React.ReactNode}){
    return(
        <>
            <div className='overflow-y-auto p-4'>
                <header className='p-4'>
                    <h1 className='text-2xl font-semibold'>Dashboard</h1>
                </header>
                <main className='  border-gray-300 rounded-xl  border-2  p-4' >
                    
                        {children}
            
                </main>
                <footer className='p-2 rounded-xl'>
                    <div>
                        By Effitrack Developers @effitrack
                    </div>
                </footer>
            </div>

        </>
    )   
}
    