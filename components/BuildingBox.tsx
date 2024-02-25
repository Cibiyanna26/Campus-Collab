'use client'

import Link from "next/link";
import React, { useEffect, useState } from 'react'
import axios from "axios";
export interface BoxInterface {
    room:{
        roomId:string;
        roomName:string;
        roomFloor:string;
        roomDetails:string;
    }
}

const BuildingBox = (props : BoxInterface) =>{
    const {room} = props;
    const [isstudent,setisStudent] = useState(false);
    const checkUser = async () =>{
        try{
          const response = await axios.get(`${process.env.NEXT_PUBLIC_HOSTED_URL as string}/api/CheckUser`);
          if(response.data.message.role !== 'Student'){
            setisStudent(false);
          }
          else{
            setisStudent(true);
          }
        }
        catch(error){
            console.log(error);
        }
      }

      useEffect(()=>{
        checkUser();
      },[])
    return(
        <>  {
            (isstudent===true) ?
            <>  
                <Link href={`/dashboard/${room.roomId}`} >
                    <div className="w-[80%] mx-auto h-[15rem] rounded-xl p-3 justify-between flex flex-col gap-y-2 bg-[#427D9D] text-white shadow-xl hover:shadow-none duration-200 ease">
                        <div className="rounded-xl w-full h-[8rem] overflow-hidden">
                            <img src={"https://ibb.co/rQxzccb"} className="w-full h-full "></img>
                        </div>
                        <div className="grid grid-cols-2 ">
                            <p> <span className="font-semibold">Room Id </span> </p>
                            <p>: {room.roomId}</p>
                            <p> <span className="font-semibold">Room Name </span> </p>
                            <p>: {room.roomName}</p>
                            <p><span className="font-semibold">Room Floor </span> </p>
                            <p>: {room.roomFloor}</p>
                        </div>
                    </div>  
                </Link>
            </>
            :
            <>
                    <div className="w-[80%] mx-auto h-[15rem] rounded-xl p-3 justify-between flex flex-col gap-y-2 bg-[#427D9D] text-white shadow-xl hover:shadow-none duration-200 ease">
                        <div className="rounded-xl w-full h-[8rem] overflow-hidden">
                            <img src={"https://ibb.co/rQxzccb"} className="w-full h-full "></img>
                        </div>
                        <div className="grid grid-cols-2 ">
                            <p> <span className="font-semibold">Room Id </span> </p>
                            <p>: {room.roomId}</p>
                            <p> <span className="font-semibold">Room Name </span> </p>
                            <p>: {room.roomName}</p>
                            <p><span className="font-semibold">Room Floor </span> </p>
                            <p>: {room.roomFloor}</p>
                        </div>
                    </div>  
            </>
        }
        
        </>
    )
}

export default BuildingBox;