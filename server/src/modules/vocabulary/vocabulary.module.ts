import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Vocabulary, VocabularySchema } from './schemas/vocabulary.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Vocabulary.name, schema: VocabularySchema }])],
    exports: [MongooseModule],
})
export class VocabularyModule {}