import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign, verify, JwtPayload } from 'jsonwebtoken';

@Injectable()
export class TokenService {
    constructor(private configService: ConfigService) {}

    createToken(payload: { userId: string; email?: string; role?: string; username?: string }): string {
        const secret = this.configService.get<string>('JWT_SECRET');
        if (!secret) throw new Error('JWT_SECRET is not configured');
        return sign(payload, secret, { expiresIn: '1h' });
    }

    verifyToken(token: string): JwtPayload {
        const secret = this.configService.get<string>('JWT_SECRET');
        if (!secret) throw new Error('JWT_SECRET is not configured');
        return verify(token, secret) as JwtPayload;
    }
}