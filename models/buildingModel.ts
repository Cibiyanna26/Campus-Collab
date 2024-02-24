import mongoose, { Document, model } from 'mongoose';

interface BuildingDocument extends Document {
    buildingName: string;
    buildingId: string;
    buildingFloorCount: string;
}

const BuildingSchema = new mongoose.Schema<BuildingDocument>(
    {
        buildingName: { type: String, required: true },
        buildingId: { type: String, required: true, unique: true },
        buildingFloorCount: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.models.Building || model<BuildingDocument>('Building', BuildingSchema);