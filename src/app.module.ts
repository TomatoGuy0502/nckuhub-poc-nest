import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ScheduleModule } from '@nestjs/schedule'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CoursesModule } from './courses/courses.module'
import { UsersModule } from './users/users.module'
import { CommentsModule } from './comments/comments.module'
import { TasksService } from './schedule/tasks.service'
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    CoursesModule,
    UsersModule,
    CommentsModule,
    ScheduleModule.forRoot(),
    TasksService
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
