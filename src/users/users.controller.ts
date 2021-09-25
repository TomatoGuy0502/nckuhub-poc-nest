import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  UseGuards,
  Request,
  ForbiddenException
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { CreateFavoriteDto } from '../favorites/dto/create-favorite.dto'
import { RemoveFavoriteDto } from 'src/favorites/dto/remove-favorite.dto'
import { AuthGuard } from '@nestjs/passport'
import { CommentsService } from 'src/comments/comments.service'
// import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly commentsService: CommentsService
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll()
  // }

  @UseGuards(AuthGuard('jwt'))
  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.usersService.findOne(userId)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':userId/comments')
  findUserComments(@Param('userId') userId: string) {
    return this.commentsService.findAllByUserId(userId)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':userId/favorites')
  findUserFavorites(@Param('userId') userId: string, @Request() req) {
    const { uid } = req.user
    if (uid !== userId) {
      throw new ForbiddenException()
    }
    return this.usersService.findUserFavorites(userId)
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':userId/favorites')
  createUserFavorite(
    @Param('userId') userId: string,
    @Body() createFavoriteDto: CreateFavoriteDto,
    @Request() req
  ) {
    const { uid } = req.user
    if (uid !== userId) {
      throw new ForbiddenException()
    }
    return this.usersService.createUserFavorite(userId, createFavoriteDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':userId/favorites')
  removeUserFavorite(
    @Param('userId') userId: string,
    @Body() removeFavoriteDto: RemoveFavoriteDto,
    @Request() req
  ) {
    const { uid } = req.user
    if (uid !== userId) {
      throw new ForbiddenException()
    }
    return this.usersService.removeUserFavorite(userId, removeFavoriteDto)
  }
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto)
  // }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') userId: string, @Request() req) {
    const { uid } = req.user
    if (uid !== userId) {
      throw new ForbiddenException()
    }
    return this.usersService.remove(userId)
  }
}
