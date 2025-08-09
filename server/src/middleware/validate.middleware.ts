import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

@Injectable()
export class ValidateMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const schema = req['schema']; // Set schema in route handler
        if (!schema) return next();
        const result = schema.safeParse(req.body);
        if (!result.success) {
        throw new HttpException(result.error.format(), HttpStatus.BAD_REQUEST);
        }
        req.body = result.data;
        next();
    }
}