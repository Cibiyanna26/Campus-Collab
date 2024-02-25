import Header from "@/components/Header"
import Link from "next/link"
export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className="w-full flex  flex-row h-[100vh] overflow-hidden">
          <div className="w-[18%] bg-blue-100 p-6 h-full">
              <div>
                  <div className=""> 
                    <h1 className="text-2xl font-bold">Campus Collab</h1>
                  </div>
                 
                  <div className="flex flex-col gap-y-4 mt-8">
                    <Link href="/dashboard" className="text-left p-2 font-semibold">Dashboard</Link>
                    <Link  href="/booked"className="text-left p-2 font-semibold">Booked</Link>
                  </div>
              </div>
          </div>
          <div className="w-full h-full overflow-y-auto">
              <div className="">{children}</div>
          </div>
      </section>
     
    </>
  )
}