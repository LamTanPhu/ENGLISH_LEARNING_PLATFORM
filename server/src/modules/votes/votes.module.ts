import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VoteRepository } from './repositories/vote.repository';
import { Vote, VoteSchema } from './schemas/vote.schema';
import { VotesController } from './votes.controller';
import { VotesService } from './votes.service';
import { VocabularyModule } from '../vocabulary/vocabulary.module';
import { FlashcardSetsModule } from '../flashcard_sets/flashcard-sets.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Vote.name, schema: VoteSchema }]),
        VocabularyModule,
        FlashcardSetsModule,
    ],
    controllers: [VotesController],
    providers: [VotesService, VoteRepository],
    exports: [VotesService, VoteRepository],
})
export class VotesModule {}