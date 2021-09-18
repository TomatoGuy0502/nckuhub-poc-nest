import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { CreateFavoriteDto } from '../favorites/dto/create-favorite.dto'
import { RemoveFavoriteDto } from 'src/favorites/dto/remove-favorite.dto'
// import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id)
  }

  @Get(':id/favorites')
  findUserFavorites(@Param('id') id: string) {
    return this.usersService.findUserFavorites(id)
  }

  @Post(':id/favorites')
  createUserFavorite(@Param('id') id: string, @Body() createFavoriteDto: CreateFavoriteDto) {
    return this.usersService.createUserFavorite(id, createFavoriteDto)
  }

  @Delete(':id/favorites')
  removeUserFavorite(@Param('id') id: string, @Body() removeFavoriteDto: RemoveFavoriteDto) {
    return this.usersService.removeUserFavorite(id, removeFavoriteDto)
  }
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto)
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id)
  }
}
