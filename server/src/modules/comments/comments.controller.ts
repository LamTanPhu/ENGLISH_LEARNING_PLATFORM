import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { UpdateCommentDto } from './dtos/update-comment.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('comments')
@UseGuards(AuthGuard('jwt'))
export class CommentsController {
    constructor(private commentsService: CommentsService) {}

    @Get()
    async findAll() {
        return this.commentsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.commentsService.findOne(id);
    }

    @Post()
    async create(@Body() createCommentDto: CreateCommentDto) {
        return this.commentsService.create(createCommentDto);
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