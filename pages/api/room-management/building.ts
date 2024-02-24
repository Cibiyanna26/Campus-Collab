import type { NextApiRequest, NextApiResponse } from 'next';
import buildingModel from '@/models/buildingModel';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;

    // if(admin) return res.
    
    switch (method) {
        case "GET":
            try{
                await buildingModel.find({}, (err: any, data: any) => {
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
                const building = await buildingModel.findOne({buildingId: req.body.buildingId});
                if(building) {
                    return res.status(400).json({error: true, message: "Building already exists"});
                }
                const newBuilding = new buildingModel({
                    buildingName: req.body.buildingName,
                    buildingId: req.body.buildingId,
                    buildingFloorCount: req.body.buildingFloorCount
                });
                await newBuilding.save();
            }
            catch(err) {
                return res.status(500).json({ error: true, message: "An error occured" });
            }
        default:
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
}