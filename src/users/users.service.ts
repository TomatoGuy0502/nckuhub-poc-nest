import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { CreateFavoriteDto } from '../favorites/dto/create-favorite.dto'
import { RemoveFavoriteDto } from 'src/favorites/dto/remove-favorite.dto'
import { FavoritesService } from 'src/favorites/favorites.service'
import { CommentsService } from 'src/comments/comments.service'
// import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private favoriteService: FavoritesService,
    private commentsService: CommentsService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User()
    user.id = createUserDto.uid
    user.displayName = createUserDto.displayName
    user.email = createUserDto.email
    return await this.usersRepository.save(user)
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  findOne(userId: string) {
    return this.usersRepository.findOne(userId)
  }

  findUserComments(userId: string) {
    return this.commentsService.findAllByUserId(userId)
  }

  findUserFavorites(userId: string) {
    return this.favoriteService.findUserFavorites(userId)
  }

  createUserFavorite(userId: string, createFavoriteDto: CreateFavoriteDto) {
    return this.favoriteService.createUserFavorite(userId, createFavoriteDto)
  }

  removeUserFavorite(userId: string, removeFavoriteDto: RemoveFavoriteDto) {
    return this.favoriteService.removeUserFavorite(userId, removeFavoriteDto)
  }

  // update(id: string, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`
  // }

  remove(id: string) {
    return this.usersRepository.delete(id)
  }
}
