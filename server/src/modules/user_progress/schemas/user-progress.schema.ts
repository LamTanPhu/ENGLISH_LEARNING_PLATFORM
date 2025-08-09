import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { FlashcardSet } from '../../flashcard_sets/schemas/flashcard-set.schema';

export type UserProgressDocument = UserProgress & Document;

@Schema({ timestamps: true })
export class UserProgress {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: User;

    @Prop({ type: Types.ObjectId, ref: 'FlashcardSet', required: true })
    flashcardSetId: FlashcardSet;

    @Prop({
        type: [{
        cardIndex: Number,
        correctCount: Number,
        incorrectCount: Number,
        lastStudied: Date,
        masteryLevel: Number,
        reviewDate: Date,
        }],
        default: [],
    })
    cardProgress: Array<{
        cardIndex: number;
        correctCount: number;
        incorrectCount: number;
        lastStudied: Date;
        masteryLevel: number;
        reviewDate: Date;
    }>;

    @Prop({ default: 0 })
    totalStudyTime: number;

    @Prop({ default: 0 })
    streak: number;

    @Prop()
    lastStudied: Date;
}

export const UserProgressSchema = SchemaFactory.createForClass(UserProgress);
UserProgressSchema.index({ userId: 1, flashcardSetId: 1 }, { unique: true });