'use client'


import { useState,useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css'; 
import { ToastContainer, toast } from 'react-toastify';
import Booking from '@/components/Booking';

function getTodayAndNext6Days() {
    const result = [];
    const today = new Date();
    console.log(today);

    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
  
      const day = nextDay.getDate();
      const month = nextDay.getMonth() + 1; // Months are zero-based
        const year = nextDay.getFullYear();
      // Format the result as a string (you can customize the format as needed)
      const formattedResult = [day,month,year];
      result.push(formattedResult);
    }
  
    return result;
  }
  

const Page = ({params}:{params:{hallid:string}}) => {
  const [rooms,setRoom] = useState([]);
    const [dateMon,setDateMon]=useState([[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]]);
    const [currentBook,setCurrentBook] = useState([0,0,0,0,0,0,0]);
    const [userDetails,setUserDetails] = useState({
        "username": "",
        "email": "",
        "role": "",
    });
    const [roomId, setRoomId] = useState('')
    const [eventDate, setEventDate] = useState('')
    const [bookingPerson,setBookingPerson] = useState('');
    const [period,setPeriod] = useState(-1);
    const [show,setShow] = useState(false);
    const [date,setDate] = useState('');
    useEffect(()=>{
        const arrayData = getTodayAndNext6Days();
        setDateMon(arrayData)
        getUserName();
    },[])

    const getUserName =async () =>{
        try{
            const response = await axios.get('http://localhost:3000/api/users');
            setUserDetails(response.data.tokenDetials);
        }catch(e){

        }
    }


 
    async function actDateBooks(year : number, month : number, day : number){
        try{
            const response = await axios.get('http://localhost:3000/api/room-management/helper.booking');
            const data = response.data.message;
            var newMonth ;
            if(month<10)newMonth = "0"+month;
            else newMonth = month;
            const clickDate = year+'-'+newMonth+'-'+day
            setDate(clickDate)
            console.log(data);
            console.log(clickDate)
            const filterData = data.filter((d : any)=>{
                if(d.roomId === params.hallid && d.eventDate === clickDate)return true;
                return false;
            })
            if(filterData.length === 0 ){
                setCurrentBook([0,0,0,0,0,0,0])
            }else{
                setCurrentBook(filterData[0].bookingHour)
            }
        
        }catch(e){

        }
    }
    
        function onClickBook(period : number){
            setPeriod(period);
            setRoomId(params.hallid);
            setBookingPerson(userDetails.username);
            setEventDate(date)
            setShow(true);
        }

  return (
        <div className='relative'>
            {
                (show) ? 
                <div className='absolute z-50 bg-white flex justify-center items-center'>
                    <Booking roomId={roomId} eventDate={eventDate} 
                    bookingPerson={bookingPerson} period={period} setShow={setShow}/>
                </div>
                :
                <></>
            }
        
          
          <div className=''>
             <div className='flex flex-row justify-around'>
                <button onClick={()=>{actDateBooks(dateMon[0][2],dateMon[0][1],dateMon[0][0])}} className='border-b-4 border-gray-400 hover:border-gray-800 p-1 rounded-xl' >{dateMon[0][0]}</button>
                <button onClick={()=>{actDateBooks(dateMon[1][2],dateMon[1][1],dateMon[1][0])}} className='border-b-4 border-gray-400 hover:border-gray-800 p-1 rounded-xl'>{dateMon[1][0]}</button>
                <button onClick={()=>{actDateBooks(dateMon[2][2],dateMon[2][1],dateMon[2][0])}} className='border-b-4 border-gray-400 hover:border-gray-800 p-1 rounded-xl'>{dateMon[2][0]}</button>
                <button onClick={()=>{actDateBooks(dateMon[3][2],dateMon[3][1],dateMon[3][0])}} className='border-b-4 border-gray-400 hover:border-gray-800 p-1 rounded-xl'>{dateMon[3][0]}</button>
                <button onClick={()=>{actDateBooks(dateMon[4][2],dateMon[4][1],dateMon[4][0])}} className='border-b-4 border-gray-400 hover:border-gray-800 p-1 rounded-xl'>{dateMon[4][0]}</button>
                <button onClick={()=>{actDateBooks(dateMon[5][2],dateMon[5][1],dateMon[5][0])}} className='border-b-4 border-gray-400 hover:border-gray-800 p-1 rounded-xl'>{dateMon[5][0]}</button>
                <button onClick={()=>{actDateBooks(dateMon[6][2],dateMon[6][1],dateMon[6][0])}} className='border-b-4 border-gray-400 hover:border-gray-800 p-1 rounded-xl'>{dateMon[6][0]}</button>
             </div>
             <div className='p-4'>
                <div className="text-center">
                    <h1 className='text-2xl font-bold'>Period</h1>
                    <h2 className='text-xl font-semibold'>Book your favorite hall !</h2>
                </div>
                <div className='grid grid-cols-4 gap-x-4 gap-y-4 p-4 rounded-xl overflow-hidden'>
                    <div className={`h-[15rem] rounded-xl overflow-hidden ${currentBook[0]===1 ? 'bg-green-400' : 'bg-gray-200 '} p-2`}>
                        <h1 className='font-bold'>1st Period</h1>

                        {
                            (currentBook[0] === 1) ? <p>Slot is booked</p>
                            :
                            <>
                                <p>Slot is Free</p>
                                <button className='bg-orange-400 p-3 rounded-xl mt-4' onClick={()=>onClickBook(0)} type='submit'>Book Now</button>
                            </>
                         }
                        
                    </div>
                    <div className={`h-[15rem] rounded-xl overflow-hidden ${currentBook[1]===1 ?'bg-green-400' : 'bg-gray-200'}  p-2`}>
                        <h1 className='font-bold'>2st Period</h1>
                        {
                            (currentBook[1] === 1) ? <p>Slot is booked</p>
                            :
                            <>
                                <p>Slot is Free</p>
                                <button className='bg-orange-400 p-3 rounded-xl mt-4' onClick={()=>onClickBook(1)} type='submit'>Book Now</button>
                            </>
                         }
                    </div>
                    <div className={`h-[15rem] rounded-xl overflow-hidden ${currentBook[2]===1 ?'"bg-green-400' : 'bg-gray-200 '} p-2`}>
                        <h1 className='font-bold'>3st Period</h1>
                        {
                            (currentBook[2] === 1) ? <p>Slot is booked</p>
                            :
                            <>
                                <p>Slot is Free</p>
                                <button className='bg-orange-400 p-3 rounded-xl mt-4' onClick={()=>onClickBook(2)} type='submit'>Book Now</button>
                            </>
                         }
                    </div>
                    <div className={`h-[15rem] rounded-xl overflow-hidden ${currentBook[3]===1 ? 'bg-green-400' : 'bg-gray-200 '} p-2`}>
                        <h1 className='font-bold'>4st Period</h1>
                        {
                            (currentBook[3] === 1) ? <p>Slot is booked</p>
                            :
                            <>
                                <p>Slot is Free</p>
                                <button className='bg-orange-400 p-3 rounded-xl mt-4' onClick={()=>onClickBook(3)} type='submit'>Book Now</button>
                                
                            </>
                         }
                    </div>
                    <div className={`h-[15rem] rounded-xl overflow-hidden ${currentBook[4]===1 ? 'bg-green-400' : 'bg-gray-200'}  p-2`}>
                        <h1 className='font-bold'>5st Period</h1>
                        {
                            (currentBook[4] === 1) ? <p>Slot is booked</p>
                            :
                            <>
                                <p>Slot is Free</p>
                                <button className='bg-orange-400 p-3 rounded-xl mt-4' onClick={()=>onClickBook(4)} type='submit'>Book Now</button>
                            </>
                         }

                    </div>
                    <div className={`h-[15rem] rounded-xl overflow-hidden ${currentBook[5]===1 ? 'bg-green-400' :'bg-gray-200'} p-2`}>
                        <h1 className='font-bold'>6st Period</h1>
                        {
                            (currentBook[5] === 1) ? <p>Slot is booked</p>
                            :
                            <>
                                <p>Slot is Free</p>
                                <button className='bg-orange-400 p-3 rounded-xl mt-4' onClick={()=>onClickBook(5)} type='submit'>Book Now</button>
                            </>
                         }

                    </div>
                    <div className={`h-[15rem] rounded-xl overflow-hidden ${currentBook[6]===1 ? 'bg-green-400' : 'bg-gray-200'} p-2 `}>
                        <h1 className='font-bold'>7st Period</h1>
                        {
                            (currentBook[6] === 1) ? <p>Slot is booked</p>
                            :
                            <>
                                <p>Slot is Free</p>
                                <button className='bg-orange-400 p-3 rounded-xl mt-4' onClick={()=>onClickBook(6)} type='submit'>Book Now</button>
                            </>
                         }

                    </div>
                </div>
                <ToastContainer />
             </div>
          </div>
          </div>
  )
}

export default Page;