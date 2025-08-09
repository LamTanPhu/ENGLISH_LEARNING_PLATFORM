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
    @IsEnum(['vocabulary', 'flashcardSet'], { message: 'targetType must be either vocabulary or flashcardSet' })
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