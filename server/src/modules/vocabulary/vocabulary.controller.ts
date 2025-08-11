import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { CreateVocabularyDto } from './dtos/create-vocabulary.dto';
import { UpdateVocabularyDto } from './dtos/update-vocabulary.dto';
import { VocabularyService } from './vocabulary.service';

@Controller('vocabulary')
@UseGuards(AuthGuard('jwt'))
export class VocabularyController {
    constructor(private vocabularyService: VocabularyService) {}

    @Get()
    async findAll() {
        return this.vocabularyService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.vocabularyService.findOne(id);
    }

    @Post()
    async create(@Body() createVocabularyDto: CreateVocabularyDto, @Req() req: Request) {
        const userId = (req as any).user?.userId;
        const payload = { ...createVocabularyDto, createdBy: userId };
        return this.vocabularyService.create(payload as any);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateVocabularyDto: UpdateVocabularyDto) {
        return this.vocabularyService.update(id, updateVocabularyDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.vocabularyService.delete(id);
    }
}