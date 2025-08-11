import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import envConfig from './config/env.config';
import { mongooseConfig } from './db/mongoose.config';
import { RolesGuard } from './guards/roles.guard';
import { AuthMiddleware } from './middleware/auth.middleware';
import { ErrorMiddleware } from './middleware/error.middleware';
import { RateLimitMiddleware } from './middleware/rate-limit.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { CommentsModule } from './modules/comments/comments.module';
import { FlashcardSetsModule } from './modules/flashcard_sets/flashcard-sets.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { UsersModule } from './modules/user/users.module';
import { UserProgressModule } from './modules/user_progress/user-progress.module';
import { VocabularyModule } from './modules/vocabulary/vocabulary.module';
import { VotesModule } from './modules/votes/votes.module';

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
  providers: [
    AppService,
    AuthMiddleware,
    ErrorMiddleware,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ErrorMiddleware, RateLimitMiddleware).forRoutes('*');
  }
}