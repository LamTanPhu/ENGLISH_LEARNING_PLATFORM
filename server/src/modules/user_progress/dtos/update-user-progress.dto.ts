import { IsArray, IsDateString, IsInt, IsMongoId, IsOptional } from 'class-validator';

export class UpdateUserProgressDto {
    @IsOptional()
    @IsMongoId()
    userId?: string;

    @IsOptional()
    @IsMongoId()
    flashcardSetId?: string;

    @IsOptional()
    @IsArray()
    cardProgress?: Array<{
        cardIndex: number;
        correctCount: number;
        incorrectCount: number;
        lastStudied: string;
        masteryLevel: number;
        reviewDate: string;
    }>;

    @IsOptional()
    @IsInt()
    totalStudyTime?: number;

    @IsOptional()
    @IsInt()
    streak?: number;

    @IsOptional()
    @IsDateString()
    lastStudied?: string;
}