import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private userRepository: UserRepository) {}

    async findAll(): Promise<any> {
        return this.userRepository.findAll();
    }

    async findOne(id: string): Promise<any> {
        return this.userRepository.findOne(id);
    }

    async create(createUserDto: any): Promise<any> {
        return this.userRepository.create(createUserDto);
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
        return this.userRepository.update(id, updateUserDto);
    }

    async delete(id: string): Promise<any> {
        return this.userRepository.delete(id);
    }
}