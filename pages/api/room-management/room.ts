import type { NextApiRequest, NextApiResponse } from 'next';
import roomModel from '@/models/roomModel';
import { authenticateMiddleware,userDetailsFromToken , UserPayload } from '@/service/user.service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;
    switch (method) {
        case "GET":
            await authenticateMiddleware(req,res, async()=>{
                const token = req.cookies.token as string;
                const tokenDetials = userDetailsFromToken(token) as UserPayload;
                try {
                    const data = await roomModel.find({}).exec();
                    return res.status(200).json({ error: false, message: data });
                } catch (err) {
                    return res.status(500).json({ error: true, message: err });
                }

            })
            return;
        case "POST":
            await authenticateMiddleware(req,res, async()=>{
                const token = req.cookies.token as string;
                const tokenDetials = userDetailsFromToken(token) as UserPayload;
                if(tokenDetials.role === 'Student'){
                    return res.status(401).json({ error: true, message: "Unauthorized" });
                }
                try{
                    const {roomId,roomName,roomFloor,roomDetails} = req.body;
                    if(!roomId || !roomName || !roomFloor || !roomDetails){
                        return res.status(401).json({error:true,message:"All Field Are Mandatory"});
                    }
                    const room = await roomModel.findOne({roomId: req.body.roomId});
                    if(room){
                        return res.status(400).json({error: true, message: "Room already exists" });
                    }
                    const newRoom = new roomModel({
                        roomId: req.body.roomId,
                        roomName: req.body.roomName,
                        roomFloor: req.body.roomFloor,
                        roomDetails: req.body.roomDetails
                    });
                    await newRoom.save();
                    return res.status(200).json({rrror:false, message: 'Room added successfully' });
                }
                catch(err) {
                    return res.status(500).json({ error: true, message: "An error occured" });
                }
            })
            return;
        default:
            return res.status(405).end(`Method ${method} Not Allowed`);
    }
}