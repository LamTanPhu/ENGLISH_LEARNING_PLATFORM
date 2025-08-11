import { Injectable } from '@nestjs/common';
import { CreateVoteDto } from './dtos/create-vote.dto';
import { VoteRepository } from './repositories/vote.repository';
import { VocabularyRepository } from '../vocabulary/repositories/vocabulary.repository';
import { FlashcardSetRepository } from '../flashcard_sets/repositories/flashcard-set.repository';

@Injectable()
export class VotesService {
    constructor(
        private voteRepository: VoteRepository,
        private vocabularyRepository: VocabularyRepository,
        private flashcardSetRepository: FlashcardSetRepository,
    ) {}

    async findAll(): Promise<any> {
        return this.voteRepository.findAll();
    }

    async findOne(id: string): Promise<any> {
        return this.voteRepository.findOne(id);
    }

    async create(createVoteDto: CreateVoteDto): Promise<any> {
        const vote = await this.voteRepository.create(createVoteDto);
        const { onModel, resourceId, type } = createVoteDto;
        const inc = type === 'downvote' ? -1 : 1;
        if (onModel === 'Vocabulary') {
            await this.vocabularyRepository.update(resourceId, { $inc: { likes: inc } });
        } else if (onModel === 'FlashcardSet') {
            await this.flashcardSetRepository.update(resourceId, { $inc: { likes: inc } });
        }
        return vote;
    }

    async delete(id: string): Promise<any> {
        return this.voteRepository.delete(id);
    }
}