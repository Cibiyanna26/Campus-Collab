import mongoose, { Document, model } from 'mongoose';

interface BuildingDocument extends Document {
    buildingName: string;
    buildingNumber: string;
    buildingFloorCount: string;
}

const BuildingSchema = new mongoose.Schema<BuildingDocument>(
    {
        buildingName: { type: String, required: true },
        buildingNumber: { type: String, required: true },
        buildingFloorCount: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.models.Building || model<BuildingDocument>('Building', BuildingSchema);