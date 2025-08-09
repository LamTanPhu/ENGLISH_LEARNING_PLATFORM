import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProgress, UserProgressSchema } from './schemas/user-progress.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: UserProgress.name, schema: UserProgressSchema }])],
    exports: [MongooseModule],
})
export class UserProgressModule {}