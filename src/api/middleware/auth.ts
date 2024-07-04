import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const SECRET_KEY: Secret = process.env.JWT_SECRET || 'secret';

interface UserJwtPayload extends JwtPayload {
    id?: number
}
export interface CustomRequest extends Request {
 token: string | UserJwtPayload;
}

export const authMiddle = async (req: Request, res: Response, next: NextFunction) => {
 try {
   const token = req.header('Authorization')?.replace('Bearer ', '');

   if (!token) {
     throw new Error('Not token defined');
   }

   const decoded = jwt.verify(token, SECRET_KEY);
   (req as CustomRequest).token = decoded;

   next();
 } catch (err) {
    let message = 'Unknown Error'
    if (err instanceof Error) message = err.message
    res.status(401).send(message);
 }
};