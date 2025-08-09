import { LoggerService } from '@nestjs/common';

export class Logger implements LoggerService {
    log(message: string) {
        console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
    }

    error(message: string, trace: string) {
        console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, trace);
    }

    warn(message: string) {
        console.warn(`[WARN] ${new Date().toISOString()} - ${message}`);
    }

    debug(message: string) {
        console.debug(`[DEBUG] ${new Date().toISOString()} - ${message}`);
    }
}