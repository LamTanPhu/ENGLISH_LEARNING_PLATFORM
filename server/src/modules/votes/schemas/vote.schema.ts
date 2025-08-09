import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../user/schemas/user.schema'; // Adjusted path

export type VoteDocument = Vote & Document;

@Schema({ timestamps: true })
export class Vote {
    @Prop({ required: true, type: Types.ObjectId, refPath: 'onModel' })
    resourceId: string;

    @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
    userId: User;

    @Prop({ required: true, enum: ['upvote', 'downvote'] })
    type: string;

    @Prop({ type: String, enum: ['Vocabulary', 'FlashcardSet'], required: true })
    onModel: string;
}

export const VoteSchema = SchemaFactory.createForClass(Vote);
VoteSchema.index({ resourceId: 1, userId: 1 }, { unique: true }); // Prevent duplicate votes