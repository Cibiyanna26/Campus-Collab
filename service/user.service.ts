import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';


export interface UserPayload {
  username:string;
  email:string;
  role:string;
}

export const generateJWT = (user: UserPayload): string => {
  const secret : string = process.env.JWT_SECRET as string;
  if (!secret) {
    throw new Error('Missing JWT secret key');
  }

  const token = jwt.sign(user, secret, { expiresIn: process.env.COOKIE_EXPIRE_TIME }); // Change '1h' to your desired expiration time
  return token;
};

interface DecodedUser {
    username: string;
    email:string;
    role:string;
    // Add more properties if needed
}

export function getTokenDetails(token:string){

}


export async function authenticateMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) {
    

        try{
           const token = req.cookies.token as string;
            if(!checkCookie(token)) {
                return res.status(401).json({ error:true,messsage: 'Unauthorized: No token provided' });
            }
            
            const decoded: unknown = jwt.verify(token, process.env.JWT_SECRET as string);
            // const decoded : DecodedUser = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedUser; 
            const decoderAsDecoderUser = isDecodedUser(decoded) ? decoded as DecodedUser : null;

            if(decoderAsDecoderUser === null){
              return res.status(401).json({error:true,message:'Token Wrong'})
            }
            next();   
        }
         catch (error) {
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
          }
   

  
}


function isDecodedUser(obj: any): obj is DecodedUser {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'username' in obj &&
    'email' in obj &&
    'role' in obj
  );
}

export function checkCookie(token : string){
  if(!token) {
    return false;
  }
  return true;
}

export function userDetailsFromToken(token:string): object{
  const decoded: unknown = jwt.verify(token, process.env.JWT_SECRET as string);
  const decoderAsDecoderUser = decoded as DecodedUser;
  return decoderAsDecoderUser;
}