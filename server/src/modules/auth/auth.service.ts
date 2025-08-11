import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../user/repositories/user.repository';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { hashPassword, comparePassword } from '../../utils/password';
import { TokenService } from '../../services/token.service';
import { UserDocument } from '../user/schemas/user.schema';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private tokenService: TokenService,
    ) {}

    async register(registerDto: RegisterDto) {
        const { email, password, username } = registerDto;
        const hashedPassword = await hashPassword(password);
        const userData = { email, password: hashedPassword, username, role: 'student' };
        const user: UserDocument = await this.userRepository.create(userData);
        const token = this.tokenService.createToken({ userId: user.id.toString(), email, role: user.role, username: user.username });
        return { token };
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;
        const user: UserDocument | null = await this.userRepository.findOneByEmail(email);
        if (!user || !(await comparePassword(password, user.password))) {
        throw new UnauthorizedException('Invalid credentials');
        }
        const token = this.tokenService.createToken({ userId: user.id.toString(), email, role: user.role, username: user.username });
        return { token };
    }
}