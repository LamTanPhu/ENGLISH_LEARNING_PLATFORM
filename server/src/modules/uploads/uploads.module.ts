import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadRepository } from './repositories/upload.repository';
import { Upload, UploadSchema } from './schemas/upload.schema';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Upload.name, schema: UploadSchema }])],
    controllers: [UploadsController],
    providers: [UploadsService, UploadRepository],
    exports: [UploadsService, UploadRepository],
})
export class UploadsModule {}