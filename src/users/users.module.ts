import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { User } from './entities/user.entity'
import { AuthStrategy } from 'src/auth/auth.strategy'
import { FavoritesModule } from 'src/favorites/favorites.module'
import { CommentsModule } from 'src/comments/comments.module'

@Module({
  imports: [TypeOrmModule.forFeature([User]), FavoritesModule, CommentsModule],
  controllers: [UsersController],
  providers: [UsersService, AuthStrategy]
})
export class UsersModule {}
