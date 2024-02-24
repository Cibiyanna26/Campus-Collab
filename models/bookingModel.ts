import mongoose, { Document, model } from 'mongoose';

interface BookingDocument extends Document {
    bookingId: string;
    roomId: string;
    eventDate: string;
    bookingPurpose: string;
    bookingPerson: string;
    bookingHour: any;
}

const BookingSchema = new mongoose.Schema<BookingDocument>(
    {
        bookingId: { type: String, required: true, unique: true },
        roomId: { type: String, required: true },
        eventDate: { type: String, required: true },
        bookingPurpose: { type: String, required: true },
        bookingPerson: { type: String, required: true },
        bookingHour: [0,0,0,0,0,0,0]
    },
    { timestamps: true }
);

export default mongoose.models.Booking || model<BookingDocument>('Booking', BookingSchema);