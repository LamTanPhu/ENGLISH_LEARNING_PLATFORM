import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comment, CommentSchema } from './schemas/comment.schema';
import { CommentRepository } from './repositories/comment.repository';

@Module({
    imports: [MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }])],
    controllers: [CommentsController],
    providers: [CommentsService, CommentRepository],
    exports: [CommentsService, CommentRepository],
})
export class CommentsModule {}