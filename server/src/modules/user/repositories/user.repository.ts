import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericRepository } from '../../../repositories/generic.repository';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserRepository extends GenericRepository<UserDocument> {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
        super(userModel);
    }

    async findOneByEmail(email: string): Promise<UserDocument | null> {
        return this.findOneByQuery({ email }); // Use the new method
    }
}