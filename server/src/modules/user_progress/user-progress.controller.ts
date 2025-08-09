import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UserProgressService } from './user-progress.service';
import { CreateUserProgressDto } from './dtos/create-user-progress.dto';
import { UpdateUserProgressDto } from './dtos/update-user-progress.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user-progress')
@UseGuards(AuthGuard('jwt'))
export class UserProgressController {
    constructor(private userProgressService: UserProgressService) {}

    @Get()
    async findAll() {
        return this.userProgressService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.userProgressService.findOne(id);
    }

    @Post()
    async create(@Body() createUserProgressDto: CreateUserProgressDto) {
        return this.userProgressService.create(createUserProgressDto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserProgressDto: UpdateUserProgressDto) {
        return this.userProgressService.update(id, updateUserProgressDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.userProgressService.delete(id);
    }
}