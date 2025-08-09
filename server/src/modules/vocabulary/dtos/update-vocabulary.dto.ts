import { IsString, IsNotEmpty, IsOptional, IsMongoId, IsInt, IsBoolean, IsDateString } from 'class-validator';

export class UpdateVocabularyDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    word?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    meaning?: string;

    @IsOptional()
    @IsString()
    pronunciation?: string;

    @IsOptional()
    @IsString()
    example?: string;

    @IsOptional()
    @IsString()
    partOfSpeech?: string;

    @IsOptional()
    @IsString()
    audio?: string;

    @IsOptional()
    @IsString()
    level?: string;

    @IsOptional()
    @IsString({ each: true })
    tags?: string[];

    @IsOptional()
    @IsMongoId()
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