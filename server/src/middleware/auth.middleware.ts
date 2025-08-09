import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private configService: ConfigService) {}

    use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1]; // Returns string | undefined
        if (!token) {
        throw new UnauthorizedException('No token provided');
        }
        try {
        const secret = this.configService.get<string>('JWT_SECRET');
        if (!secret) {
            throw new UnauthorizedException('JWT_SECRET is not configured');
        }
        const decoded = verify(token, secret);
        req['user'] = decoded;
        next();
        } catch (error) {
        throw new UnauthorizedException('Invalid token');
        }
    }
}