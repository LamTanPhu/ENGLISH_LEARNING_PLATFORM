import { IsString, IsNotEmpty, IsOptional, IsMongoId, IsEnum, IsInt, IsBoolean, IsDateString } from 'class-validator';

export class UpdateCommentDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    content?: string;

    @IsOptional()
    @IsMongoId()
    author?: string;

    @IsOptional()
    @IsEnum(['Vocabulary', 'FlashcardSet'], { message: 'targetType must be either Vocabulary or FlashcardSet' })
    targetType?: string;

    @IsOptional()
    @IsMongoId()
    targetId?: string;

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