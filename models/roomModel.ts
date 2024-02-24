import mongoose, { Document, model } from 'mongoose';

interface RoomDocument extends Document {
    rooId: string;
    roomName: string;
    roomFloor: string;
    buildingId: string;
}

const RoomSchema = new mongoose.Schema<RoomDocument>(
    {
        rooId: { type: String, required: true, unique: true},
        roomName: { type: String, required: true},
        roomFloor: { type: String, required: true },
        buildingId: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.models.Room || model<RoomDocument>('Room', RoomSchema);