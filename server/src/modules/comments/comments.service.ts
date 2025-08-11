import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { UpdateCommentDto } from './dtos/update-comment.dto';
import { CommentRepository } from './repositories/comment.repository';

@Injectable()
export class CommentsService {
    constructor(private commentRepository: CommentRepository) {}

    async findAll(): Promise<any> {
        return this.commentRepository.findAll();
    }

    async findOne(id: string): Promise<any> {
        return this.commentRepository.findOne(id);
    }

    async create(createCommentDto: CreateCommentDto): Promise<any> {
        return this.commentRepository.create(createCommentDto);
    }

    async update(id: string, updateCommentDto: UpdateCommentDto): Promise<any> {
        return this.commentRepository.update(id, updateCommentDto);
    }

    async delete(id: string): Promise<any> {
        return this.commentRepository.delete(id);
    }

    async findByTarget(targetType: string, targetId: string): Promise<any[]> {
        return this.commentRepository.findByQuery({ targetType, targetId });
    }
}