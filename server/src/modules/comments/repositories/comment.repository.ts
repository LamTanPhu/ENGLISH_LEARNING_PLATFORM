import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericRepository } from '../../../repositories/generic.repository';
import { Comment, CommentDocument } from '../schemas/comment.schema';

@Injectable()
export class CommentRepository extends GenericRepository<CommentDocument> {
    constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) {
        super(commentModel);
    }
}