import mongoose, { Document, model } from 'mongoose';


interface UserDocument extends Document {
  username: string;
  age: number;
  email: string;
  role:string;
  educationEndYear: Date | null;
  departmentOfStudy: string | null;
  committeeBelonging: string | null;
  password: string;
}

const UserSchema =new mongoose.Schema<UserDocument>(
  {
    username: { type: String, required: true },
    age: Number,
    email: { type: String, required: true, unique: true },
    role:String,
    educationEndYear: Date,
    departmentOfStudy: String,
    committeeBelonging: String,
    password: { type: String, required: true },
  },
  { timestamps: true }
);


export default mongoose.models.UserCampus || mongoose.model<UserDocument>('UserCampus', UserSchema);
