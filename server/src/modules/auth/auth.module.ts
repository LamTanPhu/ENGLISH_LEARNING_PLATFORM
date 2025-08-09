import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User, UserSchema } from '../user/schemas/user.schema'; // Adjusted path
import { TokenService } from '../../services/token.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '../user/users.module'; // Import to use UserRepository
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [
        UsersModule, // For UserRepository
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        PassportModule,
        JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: { expiresIn: '1h' },
        }),
        inject: [ConfigService],
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, TokenService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}