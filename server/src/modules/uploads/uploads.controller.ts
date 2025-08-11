import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { CreateUploadDto } from './dtos/create-upload.dto';
import { UploadsService } from './uploads.service';

@Controller('uploads')
@UseGuards(AuthGuard('jwt'))
export class UploadsController {
    constructor(private uploadsService: UploadsService) {}

    @Post()
    async create(@Body() createUploadDto: CreateUploadDto, @Req() req: Request) {
        const userId = (req as any).user?.userId;
        return this.uploadsService.create({ ...createUploadDto, uploadedBy: userId });
    }
}