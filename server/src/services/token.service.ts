import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
    constructor(private configService: ConfigService) {}

    createToken(payload: any): string {
        const secret = this.configService.get<string>('JWT_SECRET');
        if (!secret) {
        throw new Error('JWT_SECRET is not configured');
        }
        return sign(payload, secret, { expiresIn: '1h' });
    }

    verifyToken(token: string): any {
        const secret = this.configService.get<string>('JWT_SECRET');
        if (!secret) {
        throw new Error('JWT_SECRET is not configured');
        }
        return verify(token, secret);
    }
}