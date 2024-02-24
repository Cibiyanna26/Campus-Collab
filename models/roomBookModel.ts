import mongoose, { Document, model } from 'mongoose';

interface RoomDocument extends Document {
    roomId: string;
    buildingId: string;
    eventDate: string;
    bookingHour: any;
}

/*
room -> id, name, details, 
booking -> date, roomid, period , person

[]

1/1/24 , 2 , [0,0,0,1,0] , muruga
1/1/24 , 2 , [0,0,0,0,1] , cibi

2/1/24 , 3 , [1,0,0,0,00] , nithin

1/1/24 , 2 , [0,0,0,1,0] , aswath
*/

const RoomBookSchema = new mongoose.Schema<RoomDocument>(
    {
        roomId: { type: String, required: true },
        eventDate: { type: String, required: true },
        bookingHour: [0,0,0,0,0,0,0],
    },
    { timestamps: true }
);

export default mongoose.models.RoomBook || model<RoomDocument>('RoomBook', RoomBookSchema);