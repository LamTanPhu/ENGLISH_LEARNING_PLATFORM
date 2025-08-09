import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../user/schemas/user.schema';

export type FlashcardSetDocument = FlashcardSet & Document;

@Schema({ timestamps: true })
export class FlashcardSet {
    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    createdBy: User;

    @Prop({
        type: [{
        word: String,
        meaning: String,
        example: String,
        pronunciation: String,
        audio: String,
        }],
        default: [],
    })
    cards: Array<{
        word: string;
        meaning: string;
        example: string;
        pronunciation: string;
        audio: string;
    }>;

    @Prop({ enum: ['public', 'private'], default: 'public' })
    visibility: string;

    @Prop({ type: [String], default: [] })
    tags: string[];

    @Prop({ default: 0 })
    likes: number;

    @Prop({ default: 0 })
    studyCount: number;

    @Prop({ default: 1 })
    version: number;

    @Prop()
    lastUpdated: Date;
}

export const FlashcardSetSchema = SchemaFactory.createForClass(FlashcardSet);
FlashcardSetSchema.index({ createdBy: 1 });