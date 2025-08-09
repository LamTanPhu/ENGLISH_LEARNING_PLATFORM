import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { FlashcardSetsService } from './flashcard-sets.service';
import { CreateFlashcardSetDto } from './dtos/create-flashcard-set.dto';
import { UpdateFlashcardSetDto } from './dtos/update-flashcard-set.dto';
import { AuthGuard } from '@nestjs/passport';

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
    async create(@Body() createFlashcardSetDto: CreateFlashcardSetDto) {
        return this.flashcardSetsService.create(createFlashcardSetDto);
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