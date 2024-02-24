import mongoose, { Document, model } from 'mongoose';

interface RoomDocument extends Document {
    roomId: string;
    roomName: string;
    roomFloor: string;
    roomDetails: string;
}

const RoomSchema = new mongoose.Schema<RoomDocument>(
    {
        roomId: { type: String, required: true, unique: true},
        roomName: { type: String, required: true},
        roomFloor: { type: String, required: true },
        roomDetails: { type: String, required: true }
    },
    { timestamps: true }
);

export default mongoose.models.Room || model<RoomDocument>('Room', RoomSchema);