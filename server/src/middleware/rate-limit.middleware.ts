import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        return rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per windowMs
        })(req, res, next);
    }
}