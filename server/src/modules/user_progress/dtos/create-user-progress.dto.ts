import { IsMongoId, IsNotEmpty, IsOptional, IsInt, IsArray, IsDateString } from 'class-validator';

export class CreateUserProgressDto {
    @IsMongoId()
    @IsNotEmpty()
    userId: string;

    @IsMongoId()
    @IsNotEmpty()
    flashcardSetId: string;

    @IsArray()
    @IsOptional()
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