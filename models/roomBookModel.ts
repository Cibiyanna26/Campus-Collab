import mongoose, { Document, model } from 'mongoose';

interface RoomDocument extends Document {
    roomId: string;
    buildingId: string;
    eventDate: string;
    bookingHour: any;
}

const RoomBookSchema = new mongoose.Schema<RoomDocument>(
    {
        roomId: { type: String, required: true },
        buildingId: { type: String, required: true },
        eventDate: { type: String, required: true },
        bookingHour: [],
    },
    { timestamps: true }
);

export default mongoose.models.RoomBook || model<RoomDocument>('RoomBook', RoomBookSchema);