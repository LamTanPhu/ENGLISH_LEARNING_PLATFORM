import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FlashcardSet, FlashcardSetSchema } from './schemas/flashcard-set.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: FlashcardSet.name, schema: FlashcardSetSchema }])],
    exports: [MongooseModule],
})
export class FlashcardSetsModule {}