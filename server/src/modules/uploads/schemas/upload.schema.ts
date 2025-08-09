import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../user/schemas/user.schema';

export type UploadDocument = Upload & Document;

@Schema({ timestamps: true })
export class Upload {
    @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
    uploadedBy: User;

    @Prop({ required: true })
    fileUrl: string; // Cloudinary URL

    @Prop({ required: true })
    fileType: string; // e.g., 'image', 'audio'

    @Prop({ required: true })
    fileName: string;

    @Prop({ type: String, enum: ['public', 'private'], default: 'public' })
    visibility: string;

    @Prop({ type: Types.ObjectId, ref: 'Vocabulary', default: null })
    associatedVocabulary: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'FlashcardSet', default: null })
    associatedFlashcardSet: Types.ObjectId;

    @Prop({ default: 0 })
    downloads: number;
}

export const UploadSchema = SchemaFactory.createForClass(Upload);
UploadSchema.index({ uploadedBy: 1 });