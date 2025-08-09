import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericRepository } from '../../../repositories/generic.repository';
import { Vocabulary, VocabularyDocument } from '../schemas/vocabulary.schema';

@Injectable()
export class VocabularyRepository extends GenericRepository<VocabularyDocument> {
    constructor(@InjectModel(Vocabulary.name) private vocabularyModel: Model<VocabularyDocument>) {
        super(vocabularyModel);
    }
}