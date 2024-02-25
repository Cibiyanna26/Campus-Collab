import type { NextApiRequest, NextApiResponse } from 'next';
import bookingModel from '@/models/bookingModel';
import roomBookModel from '@/models/roomBookModel';
import roomModel from '@/models/roomModel';
import { authenticateMiddleware,userDetailsFromToken , UserPayload } from '@/service/user.service';

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    function getCurrentDateTime() {
        const currentDate = new Date();
        return currentDate;
    }
    
    const currentDateTime = getCurrentDateTime();
    const currentDate = currentDateTime.toISOString().split('T')[0];
    
    const method = req.method;
    switch (method) {
        case 'GET':
            try {
                const data = await bookingModel.find({});
                return res.status(200).json({error:false,message:data});
            } catch (err) {
                console.log(err);
                return res.status(500).json({ error: true, message: "An error occurred" });
            }
        case 'POST':
            await authenticateMiddleware(req,res, async()=>{
                const token = req.cookies.token as string;
                const tokenDetials = userDetailsFromToken(token) as UserPayload;
                try{
                    const {roomId,eventDate,bookingPurpose,bookingHour,bookingPerson} = req.body;
                    const room = await roomModel.findOne({roomId});
                    if(!room){
                        return res.status(404).json({error:true,message:'Please enter a valid room id'})
                    }
                    

                    if(!roomId || !eventDate || !bookingHour || !bookingHour || !bookingPerson){
                        return res.status(401).json({error:true,message:"Enter All Fields"})
                    }
        
                    const findDuplicateBooking = await bookingModel.find({eventDate: req.body.eventDate,roomId:req.body.roomId,bookingHour:req.body.bookingHour , bookingPerson:req.body.bookingPerson})
                    if(findDuplicateBooking.length>0){
                        return res.status(401).json({error:true,message:"Booking Submitted Already"});
                    }

                    const newBooking = new bookingModel({
                        roomId,
                        eventDate,
                        bookingPurpose,
                        bookingHour,
                        bookingPerson,
                        approval:'Pending',
                    });
                    await newBooking.save();

                    return res.status(200).json({error:false, message: 'Booking added successfully Wait for admin approval' });
                }
                catch(err: any){
                    return res.status(500).json({ error: true, message: err.message });
                }
            });
            break;
    }
}