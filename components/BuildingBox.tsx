'use client'

import Link from "next/link";
const BuildingBox = () =>{
    return(
        <>  
        <Link href="/login">
            <div className="w-[80%] mx-auto h-[15rem] rounded-xl border-2 border-gray-300 p-3 flex flex-col gap-y-2">
                <div className="">
                    <img src={"https://avatars.githubusercontent.com/u/121782238?v=4"} className="w-[7rem] h-[7rem] mx-auto"></img>
                </div>
                <div>
                    <h1>Room Id : 1</h1>
                    <p>Room Name : IT Center</p>
                    <p>Building Name : CSE department</p>
                </div>
            </div>  
        </Link>
        </>
    )
}

export default BuildingBox;