import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const envSchema = z.object({
    PORT: z.string().refine((val) => !isNaN(parseInt(val)), {
        message: 'PORT must be a valid number',
    }).transform((val) => parseInt(val)).default('3000'),
    MONGODB_URI: z.string().url(),
    JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),
});

export default registerAs('config', () => {
    const env = process.env;
    const parsed = envSchema.parse({
        PORT: env.PORT,
        MONGODB_URI: env.MONGODB_URI,
        JWT_SECRET: env.JWT_SECRET,
    });
    return parsed;
});