
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user: {
        sub: string;
        email: string;
        role?:string
      };
      username: string;
      timedout:string;
    }
  }
}