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
                    const room = await roomModel.findOne({roomId: req.body.roomId});
                    if(!room){
                        return res.status(404).json({error:true,message:'Please enter a valid room id'})
                    }
                    const filter = {eventDate: req.body.eventDate, roomId: req.body.roomId}
                    const booking = await roomBookModel.findOne(filter);

                   
                    if(!booking){
                        const newBooking = new roomBookModel({
                            roomId: req.body.roomId,
                            eventDate: req.body.eventDate,
                            bookingHour: req.body.bookingHour
                        });
                        await newBooking.save();
                    }
                    else{
                        const allocatedTime = booking.bookingHour;
                        const userRequestTime = req.body.bookingHour;
                        
                        for(var i = 0;i<7;i++){
                            if((allocatedTime[i]===0 && userRequestTime[i]===0)|| (allocatedTime[i]!==userRequestTime[i]) )continue;
                            else return res.status(401).json({error:true,message:'Rooms have been already books'})
                        }
                        for(var i =0;i<7;i++){
                            if(userRequestTime[i]===1){
                                allocatedTime[i] = 1;
                            }
                        }
                        console.log(booking)
                        await roomBookModel.updateOne({roomId: req.body.roomId,eventDate: req.body.eventDate},{$set:{bookingHour:allocatedTime}},{new :true})
                    }
        
                    const newBooking = new bookingModel({
                        roomId: req.body.roomId,
                        eventDate: req.body.eventDate,
                        bookingPurpose: req.body.bookingPurpose,
                        bookingHour: req.body.bookingHour,
                        bookingPerson: req.body.bookingPerson
                    });
                    await newBooking.save();

                    return res.status(200).json({error:false, message: 'Booking added successfully' });
                }
                catch(err: any){
                    return res.status(500).json({ error: true, message: err.message });
                }
            });
            break;
    }
}