import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { CreateFlashcardSetDto } from './dtos/create-flashcard-set.dto';
import { UpdateFlashcardSetDto } from './dtos/update-flashcard-set.dto';
import { FlashcardSetsService } from './flashcard-sets.service';

@Controller('flashcard-sets')
@UseGuards(AuthGuard('jwt'))
export class FlashcardSetsController {
    constructor(private flashcardSetsService: FlashcardSetsService) {}

    @Get()
    async findAll() {
        return this.flashcardSetsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.flashcardSetsService.findOne(id);
    }

    @Post()
    async create(@Body() createFlashcardSetDto: CreateFlashcardSetDto, @Req() req: Request) {
        const userId = (req as any).user?.userId;
        const payload = { ...createFlashcardSetDto, createdBy: userId };
        return this.flashcardSetsService.create(payload as any);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateFlashcardSetDto: UpdateFlashcardSetDto) {
        return this.flashcardSetsService.update(id, updateFlashcardSetDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.flashcardSetsService.delete(id);
    }
}