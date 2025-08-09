import { Injectable } from '@nestjs/common';
import { CreateUserProgressDto } from './dtos/create-user-progress.dto';
import { UpdateUserProgressDto } from './dtos/update-user-progress.dto';
import { UserProgressRepository } from './repositories/user-progress.repository';

@Injectable()
export class UserProgressService {
    constructor(private userProgressRepository: UserProgressRepository) {}

    async findAll(): Promise<any> {
        return this.userProgressRepository.findAll();
    }

    async findOne(id: string): Promise<any> {
        return this.userProgressRepository.findOne(id);
    }

    async create(createUserProgressDto: CreateUserProgressDto): Promise<any> {
        return this.userProgressRepository.create(createUserProgressDto);
    }

    async update(id: string, updateUserProgressDto: UpdateUserProgressDto): Promise<any> {
        return this.userProgressRepository.update(id, updateUserProgressDto);
    }

    async delete(id: string): Promise<any> {
        return this.userProgressRepository.delete(id);
    }
}