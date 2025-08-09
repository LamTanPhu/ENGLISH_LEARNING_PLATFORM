import { Injectable } from '@nestjs/common';
import { UploadRepository } from './repositories/upload.repository';
import { CreateUploadDto } from './dtos/create-upload.dto';

@Injectable()
export class UploadsService {
    constructor(private uploadRepository: UploadRepository) {}

    async create(createUploadDto: CreateUploadDto): Promise<any> {
        return this.uploadRepository.create(createUploadDto);
    }
}