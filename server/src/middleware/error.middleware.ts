import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../utils/http-exception';
import 'express';

declare module 'express-serve-static-core' {
    interface Response {
        sendError: (status: number, message: string) => Response;
    }
}

@Injectable()
export class ErrorMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        res.sendError = (status: number, message: string) => res.status(status).json({ message });
        next();
    }
}