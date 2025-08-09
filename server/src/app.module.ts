import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/user/users.module';
import { VocabularyModule } from './modules/vocabulary/vocabulary.module';
import { FlashcardSetsModule } from './modules/flashcard_sets/flashcard-sets.module';
import { UserProgressModule } from './modules/user_progress/user-progress.module';
import { CommentsModule } from './modules/comments/comments.module';
import { VotesModule } from './modules/votes/votes.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import envConfig from './config/env.config';
import { AuthMiddleware } from './middleware/auth.middleware';
import { ErrorMiddleware } from './middleware/error.middleware';
import { mongooseConfig } from './db/mongoose.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfig],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: () => mongooseConfig,
    }),
    AuthModule,
    UsersModule,
    VocabularyModule,
    FlashcardSetsModule,
    UserProgressModule,
    CommentsModule,
    VotesModule,
    UploadsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthMiddleware, ErrorMiddleware],
})
export class AppModule {}