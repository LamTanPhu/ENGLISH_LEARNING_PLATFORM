import { IsEnum, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateVoteDto {
    @IsMongoId()
    @IsNotEmpty()
    resourceId: string;

    @IsMongoId()
    @IsOptional()
    userId?: string;

    @IsEnum(['upvote', 'downvote'], { message: 'type must be upvote or downvote' })
    @IsNotEmpty()
    type: string;

    @IsEnum(['Vocabulary', 'FlashcardSet'], { message: 'onModel must be Vocabulary or FlashcardSet' })
    @IsNotEmpty()
    onModel: string;
}