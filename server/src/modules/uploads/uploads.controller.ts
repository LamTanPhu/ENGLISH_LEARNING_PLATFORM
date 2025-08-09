import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUploadDto } from './dtos/create-upload.dto';
import { UploadsService } from './uploads.service';

@Controller('uploads')
@UseGuards(AuthGuard('jwt'))
export class UploadsController {
    constructor(private uploadsService: UploadsService) {}

    @Post()
    async create(@Body() createUploadDto: CreateUploadDto) {
        return this.uploadsService.create(createUploadDto);
    }
}