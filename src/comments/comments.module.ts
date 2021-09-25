import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommentsService } from './comments.service'
import { CommentsController } from './comments.controller'
import { Comment } from './entities/comment.entity'
import { AuthStrategy } from 'src/auth/auth.strategy'

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  controllers: [CommentsController],
  providers: [CommentsService, AuthStrategy],
  exports: [CommentsService]
})
export class CommentsModule {}
