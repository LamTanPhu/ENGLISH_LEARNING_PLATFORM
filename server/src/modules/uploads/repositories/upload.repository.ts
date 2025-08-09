import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Upload, UploadDocument } from '../schemas/upload.schema';
import { GenericRepository } from '../../../repositories/generic.repository';

@Injectable()
export class UploadRepository extends GenericRepository<UploadDocument> {
    constructor(@InjectModel(Upload.name) private uploadModel: Model<UploadDocument>) {
        super(uploadModel);
    }
}