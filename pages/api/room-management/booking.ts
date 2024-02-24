import type { NextApiRequest, NextApiResponse } from 'next';
import bookingModel from '@/models/bookingModel';
import roomBookModel from '@/models/roomBookModel';

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
                const data = await bookingModel.find({ eventDate: { $gte: currentDate } });
                return res.status(200).json(data);
            } catch (err) {
                console.log(err);
                return res.status(500).json({ error: true, message: "An error occurred" });
            }
        case 'POST':
            try{
                const booking = await roomBookModel.findOne({eventDate: req.body.eventDate, roomId: req.body.roomNumber, buildingId: req.body.buildingNumber});
                console.log(booking);
                const helper = []; //0
                for (let i = 0; i < req.body.bookingHour.length; i++) {
                    if(req.body.bookingHour[i] != 0){
                        console.log(i)
                        helper.push(i);
                    }
                }
                for(let i  = 0 ; i < booking.bookingHour.length; i++){
                    if(booking.bookingHour[i] == 1){
                        if(helper.includes(i)){
                            return res.status(400).json({error: true, message: "Room already booked for the selected hours"});
                        }
                    }
                }
                for(let i = 0; i < helper.length; i++){
                    booking.bookingHour[helper[i]] = 1;
                }
                const newBooking = new bookingModel({
                    bookingId: req.body.bookingId,
                    roomNumber: req.body.roomNumber,
                    buildingNumber: req.body.buildingNumber,
                    eventDate: req.body.eventDate,
                    bookingHour: booking.bookingHour,
                    bookingPurpose: req.body.bookingPurpose,
                    bookingPerson: req.body.bookingPerson
                });
                await newBooking.save();
                return res.status(200).json({ message: 'Booking added successfully' });
            }
            catch(err: any){
                return res.status(500).json({ error: true, message: err.message });
            }
    }
}