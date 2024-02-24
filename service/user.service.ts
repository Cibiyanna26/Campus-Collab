import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';


interface UserPayload {
  username:string;
  email:string;
}

export const generateJWT = (user: UserPayload): string => {
  const secret : string = process.env.JWT_SECRET as string;
  if (!secret) {
    throw new Error('Missing JWT secret key');
  }

  const token = jwt.sign(user, secret, { expiresIn: '7d' }); // Change '1h' to your desired expiration time
  return token;
};

interface DecodedUser {
    username: string;
    email:string;
    // Add more properties if needed
}


export async function authenticateMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) {
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

        try{
            const token : string = req.headers.authorization.split(' ')[1];
            if(!token) {
                return res.status(401).json({ error:true,messsage: 'Unauthorized: No token provided' });
            }
            
              
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedUser; 
            
            if(!decoded){
                return res.status(401).json({error:true,message:"Authentication failed"})
            }
            next();   
        }
         catch (error) {
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
          }
    }

  
}

