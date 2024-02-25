'use client'

import Link from "next/link";


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
    return(
        <>  
        <Link href={`/dashboard/${room.roomId}`}>
            <div className="w-[80%] mx-auto h-[15rem] rounded-xl border-2 border-gray-300 p-3 flex flex-col gap-y-2">
                <div className="">
                    <img src={"https://avatars.githubusercontent.com/u/121782238?v=4"} className="w-[7rem] h-[7rem] mx-auto"></img>
                </div>
                <div>
                    <h1>Room Id : {room.roomId}</h1>
                    <p>Room Name : {room.roomName}</p>
                    <p>roomFloor : {room.roomFloor}</p>
                </div>
            </div>  
        </Link>
        </>
    )
}

export default BuildingBox;