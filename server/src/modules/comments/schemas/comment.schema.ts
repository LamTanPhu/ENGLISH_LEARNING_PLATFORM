import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { Vocabulary } from '../../vocabulary/schemas/vocabulary.schema';
import { FlashcardSet } from '../../flashcard_sets/schemas/flashcard-set.schema';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true })
export class Comment {
    @Prop({ required: true })
    content: string;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    author: User;

    @Prop({ enum: ['vocabulary', 'flashcardSet'], required: true })
    targetType: string;

    @Prop({ type: Types.ObjectId, refPath: 'targetType', required: true })
    targetId: Vocabulary | FlashcardSet;

    @Prop({ type: Types.ObjectId, ref: 'Comment' })
    parentComment: Comment;

    @Prop({ default: 0 })
    depth: number;

    @Prop({ type: [Types.ObjectId], default: [] })
    path: Types.ObjectId[];

    @Prop({ default: 0 })
    likes: number;

    @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
    likedBy: User[];

    @Prop({ default: false })
    isDeleted: boolean;

    @Prop()
    lastActive: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
CommentSchema.index({ targetId: 1, targetType: 1 });
CommentSchema.index({ author: 1 });