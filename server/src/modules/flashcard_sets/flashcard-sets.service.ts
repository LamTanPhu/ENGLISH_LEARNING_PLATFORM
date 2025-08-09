import { Injectable } from '@nestjs/common';
import { FlashcardSetRepository } from './repositories/flashcard-set.repository';
import { CreateFlashcardSetDto } from './dtos/create-flashcard-set.dto';
import { UpdateFlashcardSetDto } from './dtos/update-flashcard-set.dto';

@Injectable()
export class FlashcardSetsService {
    constructor(private flashcardSetRepository: FlashcardSetRepository) {}

    async findAll(): Promise<any> {
        return this.flashcardSetRepository.findAll();
    }

    async findOne(id: string): Promise<any> {
        return this.flashcardSetRepository.findOne(id);
    }

    async create(createFlashcardSetDto: CreateFlashcardSetDto): Promise<any> {
        return this.flashcardSetRepository.create(createFlashcardSetDto);
    }

    async update(id: string, updateFlashcardSetDto: UpdateFlashcardSetDto): Promise<any> {
        return this.flashcardSetRepository.update(id, updateFlashcardSetDto);
    }

    async delete(id: string): Promise<any> {
        return this.flashcardSetRepository.delete(id);
    }
}