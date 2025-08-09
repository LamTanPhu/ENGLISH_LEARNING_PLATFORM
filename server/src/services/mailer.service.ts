import { Injectable } from '@nestjs/common';

@Injectable()
export class MailerService {
    sendEmail(to: string, subject: string, text: string): Promise<void> {
        // Placeholder for email service
        console.log(`Sending email to ${to}: ${subject} - ${text}`);
        return Promise.resolve();
    }
}