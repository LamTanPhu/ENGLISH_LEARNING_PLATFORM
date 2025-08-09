import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth') // Ensure this matches the endpoint prefix
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('protected')
    @UseGuards(AuthGuard('jwt'))
    async protected() {
        return { message: 'This is a protected route' };
    }
}