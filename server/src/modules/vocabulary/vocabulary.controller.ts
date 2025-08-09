import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
    async create(@Body() createVocabularyDto: CreateVocabularyDto) {
        return this.vocabularyService.create(createVocabularyDto);
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