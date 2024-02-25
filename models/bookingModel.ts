import mongoose, { Document, model } from 'mongoose';

interface BookingDocument extends Document {
    roomId: string;
    eventDate: string;
    bookingPurpose: string;
    bookingPerson: string;
    bookingHour: any;
    approval:string;
}

const BookingSchema = new mongoose.Schema<BookingDocument>(
    {
        roomId: { type: String, required: true },
        eventDate: { type: String, required: true },
        bookingPurpose: { type: String, required: true },
        bookingPerson: { type: String, required: true },
        bookingHour: [0,0,0,0,0,0,0],
        approval:{type:String,default:"Pending"}
    },
    { timestamps: true }
);

export default mongoose.models.Booking || model<BookingDocument>('Booking', BookingSchema);