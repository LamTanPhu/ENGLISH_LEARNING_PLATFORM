import { Injectable } from '@nestjs/common';

@Injectable()
export class StorageService {
    upload(file: any): Promise<string> {
        // Placeholder for Cloudinary upload
        return Promise.resolve('cloudinary_url');
    }
}