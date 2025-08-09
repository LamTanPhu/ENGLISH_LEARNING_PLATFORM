import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FlashcardSetsController } from './flashcard-sets.controller';
import { FlashcardSetsService } from './flashcard-sets.service';
import { FlashcardSet, FlashcardSetSchema } from './schemas/flashcard-set.schema';
import { FlashcardSetRepository } from './repositories/flashcard-set.repository';

@Module({
    imports: [MongooseModule.forFeature([{ name: FlashcardSet.name, schema: FlashcardSetSchema }])],
    controllers: [FlashcardSetsController],
    providers: [FlashcardSetsService, FlashcardSetRepository],
    exports: [FlashcardSetsService, FlashcardSetRepository],
})
export class FlashcardSetsModule {}