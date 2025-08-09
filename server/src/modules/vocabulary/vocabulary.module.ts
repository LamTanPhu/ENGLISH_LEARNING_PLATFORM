import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VocabularyController } from './vocabulary.controller';
import { VocabularyService } from './vocabulary.service';
import { Vocabulary, VocabularySchema } from './schemas/vocabulary.schema';
import { VocabularyRepository } from './repositories/vocabulary.repository';

@Module({
    imports: [MongooseModule.forFeature([{ name: Vocabulary.name, schema: VocabularySchema }])],
    controllers: [VocabularyController],
    providers: [VocabularyService, VocabularyRepository],
    exports: [VocabularyService, VocabularyRepository],
})
export class VocabularyModule {}