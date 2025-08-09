import { IsString, IsNotEmpty, IsMongoId, IsEnum, IsOptional, IsInt, IsBoolean, IsDateString } from 'class-validator';

export class CreateCommentDto {
    @IsString()
    @IsNotEmpty()
    content: string;

    @IsMongoId()
    @IsNotEmpty()
    author: string;

    @IsEnum(['vocabulary', 'flashcardSet'], { message: 'targetType must be either vocabulary or flashcardSet' })
    @IsNotEmpty()
    targetType: string;

    @IsMongoId()
    @IsNotEmpty()
    targetId: string;

    @IsOptional()
    @IsMongoId()
    parentComment?: string;

    @IsOptional()
    @IsInt()
    depth?: number;

    @IsOptional()
    @IsMongoId({ each: true })
    path?: string[];

    @IsOptional()
    @IsInt()
    likes?: number;

    @IsOptional()
    @IsMongoId({ each: true })
    likedBy?: string[];

    @IsOptional()
    @IsBoolean()
    isDeleted?: boolean;

    @IsOptional()
    @IsDateString()
    lastActive?: string;
}