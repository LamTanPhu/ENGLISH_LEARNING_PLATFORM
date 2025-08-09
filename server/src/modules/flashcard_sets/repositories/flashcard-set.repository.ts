import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FlashcardSet, FlashcardSetDocument } from '../schemas/flashcard-set.schema';
import { GenericRepository } from '../../../repositories/generic.repository';

@Injectable()
export class FlashcardSetRepository extends GenericRepository<FlashcardSetDocument> {
    constructor(@InjectModel(FlashcardSet.name) private flashcardSetModel: Model<FlashcardSetDocument>) {
        super(flashcardSetModel);
    }
}