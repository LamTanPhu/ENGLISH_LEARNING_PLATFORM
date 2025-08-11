import { IsMongoId, IsNotEmpty, IsString, IsEnum, IsOptional, IsInt } from 'class-validator';

export class CreateUploadDto {
    @IsMongoId()
    @IsOptional()
    uploadedBy?: string;

    @IsString()
    @IsNotEmpty()
    fileUrl: string;

    @IsString()
    @IsNotEmpty()
    fileType: string;

    @IsString()
    @IsNotEmpty()
    fileName: string;

    @IsEnum(['public', 'private'], { message: 'visibility must be public or private' })
    @IsOptional()
    visibility?: string;

    @IsOptional()
    @IsMongoId()
    associatedVocabulary?: string;

    @IsOptional()
    @IsMongoId()
    associatedFlashcardSet?: string;

    @IsOptional()
    @IsInt()
    downloads?: number;
}