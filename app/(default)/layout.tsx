import Header from "@/components/Header"
import Link from "next/link"
export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className="w-full flex  flex-row h-[100vh] overflow-hidden">
          <div className="w-[18%] bg-[#164863] p-6 h-full text-[#EEF5FF]">
              <div>
                  <div className=""> 
                    <h1 className="text-2xl font-bold">Campus <span className="text-[#86B6F6]">Collab</span></h1>
                  </div>
                 
                  <div className="flex flex-col gap-y-4 mt-8">
                    <Link href="/dashboard" className="text-left p-2 font-semibold text-lg hover:bg-[#427D9D] rounded-xl duration-200 ease-in">
                      Dashboard
                    </Link>
                    <Link  href="/booked"className="text-left p-2 font-semibold text-lg hover:bg-[#427D9D] rounded-xl duration-200 ease-in">
                      Booked
                    </Link>
                  </div>
              </div>
          </div>
          <div className="w-full h-full overflow-y-auto bg-[#EEF5FF] relativ px-4">
              <div className="h-full">{children}</div>
              
          </div>
      </section>
     
    </>
  )
}