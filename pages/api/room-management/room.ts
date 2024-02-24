import type { NextApiRequest, NextApiResponse } from 'next';
import roomModel from '@/models/roomModel';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;
    switch (method) {
        case "GET":
            try{
                await roomModel.find({}, (err: any, data: any) => {
                    if (err) {
                        return res.status(500).json({ error: true, message: "An error occured" });
                    }
                    return res.status(200).json(data);
                });
            }
            catch(err) {
                return res.status(500).json({ error: true, message: "An error occured" });
            }

        case "POST":
            try{
                const room = await roomModel.findOne({roomId: req.body.roomId});
                if(room){
                    return res.status(400).json({error: true, message: "Room already exists" });
                }
                const newRoom = new roomModel({
                    roomId: req.body.roomId,
                    roomName: req.body.roomName,
                    roomFloor: req.body.roomFloor,
                    buildingId: req.body.buildingId
                });
                await newRoom.save();
                return res.status(200).json({ message: 'Room added successfully' });
            }
            catch(err) {
                return res.status(500).json({ error: true, message: "An error occured" });
            }
        default:
            return res.status(405).end(`Method ${method} Not Allowed`);
    }
}