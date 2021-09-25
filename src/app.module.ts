import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ScheduleModule } from '@nestjs/schedule'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CoursesModule } from './courses/courses.module'
import { UsersModule } from './users/users.module'
import { CommentsModule } from './comments/comments.module'
import { TasksService } from './schedule/tasks.service'
import { FavoritesModule } from './favorites/favorites.module'
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    CoursesModule,
    UsersModule,
    CommentsModule,
    TasksService,
    FavoritesModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
