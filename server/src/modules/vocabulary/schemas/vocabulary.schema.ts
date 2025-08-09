import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../user/schemas/user.schema';

export type VocabularyDocument = Vocabulary & Document;

@Schema({ timestamps: true })
export class Vocabulary {
    @Prop({ required: true })
    word: string;

    @Prop({ required: true })
    meaning: string;

    @Prop()
    pronunciation: string;

    @Prop()
    example: string;

    @Prop()
    partOfSpeech: string;

    @Prop()
    audio: string;

    @Prop({ enum: ['beginner', 'intermediate', 'advanced'], default: 'intermediate' })
    level: string;

    @Prop({ type: [String], default: [] })
    tags: string[];

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    createdBy: User;

    @Prop({ default: 0 })
    likes: number;

    @Prop({ default: 0 })
    views: number;

    @Prop({ default: false })
    isApproved: boolean;

    @Prop()
    lastActive: Date;
}

export const VocabularySchema = SchemaFactory.createForClass(Vocabulary);
VocabularySchema.index({ createdBy: 1 });