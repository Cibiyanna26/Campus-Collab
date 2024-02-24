import mongoose, { Document, model } from 'mongoose';

interface BookingDocument extends Document {
    bookingId: string;
    roomId: string;
    buildingNumber: string;
    eventDate: string;
    bookingPurpose: string;
    bookingPerson: string;
}

const BookingSchema = new mongoose.Schema<BookingDocument>(
    {
        bookingId: { type: String, required: true, unique: true },
        roomId: { type: String, required: true },
        buildingNumber: { type: String, required: true },
        eventDate: { type: String, required: true },
        bookingPurpose: { type: String, required: true },
        bookingPerson: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.models.Booking || model<BookingDocument>('Booking', BookingSchema);