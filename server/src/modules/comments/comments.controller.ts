import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { UpdateCommentDto } from './dtos/update-comment.dto';

@Controller('comments')
@UseGuards(AuthGuard('jwt'))
export class CommentsController {
    constructor(private commentsService: CommentsService) {}

    @Get()
    async findAll(@Query('targetType') targetType?: string, @Query('targetId') targetId?: string) {
        if (targetType && targetId) {
            return this.commentsService.findByTarget(targetType, targetId);
        }
        return this.commentsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.commentsService.findOne(id);
    }

    @Post()
    async create(@Body() createCommentDto: CreateCommentDto, @Req() req: Request) {
        const userId = (req as any).user?.userId;
        return this.commentsService.create({ ...createCommentDto, author: userId });
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
        return this.commentsService.update(id, updateCommentDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.commentsService.delete(id);
    }
}