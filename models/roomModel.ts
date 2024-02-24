import mongoose, { Document, model } from 'mongoose';

interface RoomDocument extends Document {
    roomNumber: string;
    roomFloor: string;
    buildingNumber: string;
}

const RoomSchema = new mongoose.Schema<RoomDocument>(
    {
        roomNumber: { type: String, required: true },
        roomFloor: { type: String, required: true },
        buildingNumber: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.models.Room || model<RoomDocument>('Room', RoomSchema);