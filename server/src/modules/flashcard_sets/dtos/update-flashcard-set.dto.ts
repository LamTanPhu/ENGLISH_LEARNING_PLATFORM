import { IsString, IsNotEmpty, IsOptional, IsMongoId, IsEnum, IsInt, IsArray, IsDateString } from 'class-validator';

export class UpdateFlashcardSetDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsMongoId()
    createdBy?: string;

    @IsOptional()
    @IsArray()
    cards?: Array<{
        word: string;
        meaning: string;
        example: string;
        pronunciation: string;
        audio: string;
    }>;

    @IsOptional()
    @IsEnum(['public', 'private'], { message: 'visibility must be public or private' })
    visibility?: string;

    @IsOptional()
    @IsString({ each: true })
    tags?: string[];

    @IsOptional()
    @IsInt()
    likes?: number;

    @IsOptional()
    @IsInt()
    studyCount?: number;

    @IsOptional()
    @IsInt()
    version?: number;

    @IsOptional()
    @IsDateString()
    lastUpdated?: string;
}