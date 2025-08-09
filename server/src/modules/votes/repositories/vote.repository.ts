import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericRepository } from '../../../repositories/generic.repository';
import { Vote, VoteDocument } from '../schemas/vote.schema';

@Injectable()
export class VoteRepository extends GenericRepository<VoteDocument> {
    constructor(@InjectModel(Vote.name) private voteModel: Model<VoteDocument>) {
        super(voteModel);
    }
}