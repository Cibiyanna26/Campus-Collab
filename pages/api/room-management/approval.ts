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
                    const {roomId,eventDate,bookingHour} = req.body;
                    const room = await roomModel.findOne({roomId});
                    if(!room){
                        return res.status(404).json({error:true,message:'Please enter a valid room id'})
                    }
                    

                    if(!roomId || !eventDate || !bookingHour ){
                        return res.status(401).json({error:true,message:"Enter All Fields"})
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
                            else {
                                return res.status(401).json({error:true,message:'Halls have been already booked'})
                            }
                        }
                        for(var i =0;i<7;i++){
                            if(userRequestTime[i]===1){
                                allocatedTime[i] = 1;
                            }
                        }
                        console.log(booking)
                        await roomBookModel.updateOne({roomId: req.body.roomId,eventDate: req.body.eventDate},{$set:{bookingHour:allocatedTime}},{new :true})
                    }

                    await bookingModel.updateOne({roomId: req.body.roomId,eventDate:req.body.eventDate,bookingPerson:req.body.bookingPerson},{$set:{approval:"Approved"}});
                   
                    return res.status(200).json({error:false, message: 'Approved' });
                }
                catch(err: any){
                    return res.status(500).json({ error: true, message: err.message });
                }
            });
            break;

            case 'DELETE':
                const roomId = req.query.roomId;
                const eventDate = req.query.eventDate;
                const bookingHour = req.query.bookingHour;
                const bookingPerson = req.query.bookingPerson;
                try{
                    const response = await bookingModel.deleteOne({roomId,eventDate,bookingPerson});
                    console.log(response);
                    if(!response)return res.status(401).json({error:true,message:"Error in deleting the booking"});
                    return res.status(200).json({error:false,message:'Declined the Request'});
                } catch(e){

                }
                res.status(200).send({error:false,message:'DELETE request processed'});
                break;
    }
}