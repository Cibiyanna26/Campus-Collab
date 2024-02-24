import mongoose, { Document, model } from 'mongoose';

interface BookingDocument extends Document {
    roomNumber: string;
    buildingNumber: string;
    bookingDate: string;
    bookingStartTime: string;
    bookingEndTime: string;
    bookingPurpose: string;
    bookingPerson: string;
}

const BookingSchema = new mongoose.Schema<BookingDocument>(
    {
        roomNumber: { type: String, required: true },
        buildingNumber: { type: String, required: true },
        bookingDate: { type: String, required: true },
        bookingStartTime: { type: String, required: true },
        bookingEndTime: { type: String, required: true },
        bookingPurpose: { type: String, required: true },
        bookingPerson: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.models.Booking || model<BookingDocument>('Booking', BookingSchema);