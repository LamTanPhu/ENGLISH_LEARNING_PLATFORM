import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericRepository } from '../../../repositories/generic.repository';
import { UserProgress, UserProgressDocument } from '../schemas/user-progress.schema';

@Injectable()
export class UserProgressRepository extends GenericRepository<UserProgressDocument> {
    constructor(@InjectModel(UserProgress.name) private userProgressModel: Model<UserProgressDocument>) {
        super(userProgressModel);
    }
}