import { connectDB } from "@/models/db";
import { NextApiRequest , NextApiResponse} from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    try{
        await connectDB();
        return res.status(200).json({error:false,message:"Successfully connected"})
    }catch(err){
        return res.status(500).json({error:true,message:"db not connected"})
    }   
}