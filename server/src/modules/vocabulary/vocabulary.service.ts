import { Injectable } from '@nestjs/common';
import { CreateVocabularyDto } from './dtos/create-vocabulary.dto';
import { UpdateVocabularyDto } from './dtos/update-vocabulary.dto';
import { VocabularyRepository } from './repositories/vocabulary.repository';

@Injectable()
export class VocabularyService {
    constructor(private vocabularyRepository: VocabularyRepository) {}

    async findAll(): Promise<any> {
        return this.vocabularyRepository.findAll();
    }

    async findOne(id: string): Promise<any> {
        return this.vocabularyRepository.findOne(id);
    }

    async create(createVocabularyDto: CreateVocabularyDto): Promise<any> {
        return this.vocabularyRepository.create(createVocabularyDto);
    }

    async update(id: string, updateVocabularyDto: UpdateVocabularyDto): Promise<any> {
        return this.vocabularyRepository.update(id, updateVocabularyDto);
    }

    async delete(id: string): Promise<any> {
        return this.vocabularyRepository.delete(id);
    }
}