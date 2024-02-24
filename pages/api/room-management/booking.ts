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
                console.log("request body :",req.body);
                const filter = {eventDate: req.body.eventDate, roomId: req.body.roomId}
                const booking = await roomBookModel.findOne(filter);
                /*
                    room id  = 1
                    evnet date = 1/1/24
                    booking hour = [0,0,0,1]
                */
                const newBooking = new bookingModel({
                    bookingId: req.body.bookingId,
                    roomId: req.body.roomId,
                    eventDate: req.body.eventDate,
                    bookingPurpose: req.body.bookingPurpose,
                    bookingHour: req.body.bookingHour,
                    bookingPerson: req.body.bookingPerson
                });
                await newBooking.save();
                if(!booking){
                    const newBooking = new roomBookModel({
                        roomId: req.body.roomId,
                        eventDate: req.body.eventDate,
                        bookingHour: req.body.bookingHour
                    });
                    await newBooking.save();
                    return res.status(200).json({ message: 'Booking added successfully' });
                }
                if(!booking){

                }
                await roomBookModel.findOneAndUpdate(filter, booking, {new :true});
                return res.status(200).json({ message: 'Booking added successfully' });
            }
            catch(err: any){
                return res.status(500).json({ error: true, message: err.message });
            }
    }
}