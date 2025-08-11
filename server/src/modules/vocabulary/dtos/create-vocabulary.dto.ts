import { IsString, IsNotEmpty, IsOptional, IsMongoId, IsInt, IsBoolean, IsDateString } from 'class-validator';

export class CreateVocabularyDto {
    @IsString()
    @IsNotEmpty()
    word: string;

    @IsString()
    @IsNotEmpty()
    meaning: string;

    @IsString()
    @IsOptional()
    pronunciation?: string;

    @IsString()
    @IsOptional()
    example?: string;

    @IsString()
    @IsOptional()
    partOfSpeech?: string;

    @IsString()
    @IsOptional()
    audio?: string;

    @IsString()
    @IsOptional()
    level?: string;

    @IsString({ each: true })
    @IsOptional()
    tags?: string[];

    @IsMongoId()
    @IsOptional()
    createdBy?: string;

    @IsOptional()
    @IsInt()
    likes?: number;

    @IsOptional()
    @IsInt()
    views?: number;

    @IsOptional()
    @IsBoolean()
    isApproved?: boolean;

    @IsOptional()
    @IsDateString()
    lastActive?: string;
}