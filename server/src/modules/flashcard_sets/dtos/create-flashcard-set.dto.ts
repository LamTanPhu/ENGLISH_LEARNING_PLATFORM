import { IsString, IsNotEmpty, IsMongoId, IsEnum, IsOptional, IsArray, IsInt, IsDateString } from 'class-validator';

export class CreateFlashcardSetDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsMongoId()
    @IsNotEmpty()
    createdBy: string;

    @IsArray()
    @IsOptional()
    cards?: Array<{
        word: string;
        meaning: string;
        example: string;
        pronunciation: string;
        audio: string;
    }>;

    @IsEnum(['public', 'private'], { message: 'visibility must be public or private' })
    @IsOptional()
    visibility?: string;

    @IsString({ each: true })
    @IsOptional()
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