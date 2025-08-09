import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProgressRepository } from './repositories/user-progress.repository';
import { UserProgress, UserProgressSchema } from './schemas/user-progress.schema';
import { UserProgressController } from './user-progress.controller';
import { UserProgressService } from './user-progress.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: UserProgress.name, schema: UserProgressSchema }])],
    controllers: [UserProgressController],
    providers: [UserProgressService, UserProgressRepository],
    exports: [UserProgressService, UserProgressRepository],
})
export class UserProgressModule {}