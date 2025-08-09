import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    username: string;

    @Prop({ enum: ['beginner', 'intermediate', 'advanced'], default: 'intermediate' })
    level: string;

    @Prop({ default: 0 })
    points: number;

    @Prop({ enum: ['student', 'teacher', 'admin'], default: 'student' })
    role: string;

    @Prop()
    avatar: string;

    @Prop()
    bio: string;

    @Prop()
    lastActive: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
