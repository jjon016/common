import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    console.log('JWT: ' + req.session.jwt);
    console.log('Key: ' + process.env.JWTKEY);
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWTKEY!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}

  next();
};
