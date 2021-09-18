import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, EntityManager } from 'typeorm'
import { User } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { Favorite } from '../favorites/entities/favorite.entity'
import { CreateFavoriteDto } from '../favorites/dto/create-favorite.dto'
import { RemoveFavoriteDto } from 'src/favorites/dto/remove-favorite.dto'
// import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private entityManager: EntityManager
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

  async findUserFavorites(userId: string) {
    const data = await this.usersRepository.findOne(userId, {
      relations: ['favorites', 'favorites.course', 'favorites.course.department']
    })
    if (!data) {
      return []
    }
    return data.favorites.map((favorate) => favorate.course)
  }

  async createUserFavorite(userId: string, createFavoriteDto: CreateFavoriteDto) {
    const { courseId } = createFavoriteDto
    const data = await this.entityManager
      .createQueryBuilder(Favorite, 'favorite')
      .insert()
      .values({ courseId, userId })
      .execute()
    return data
  }

  async removeUserFavorite(userId: string, removeFavoriteDto: RemoveFavoriteDto) {
    const { courseId } = removeFavoriteDto
    return await this.entityManager
      .createQueryBuilder(Favorite, 'favorite')
      .delete()
      .where('userId = :userId', { userId })
      .andWhere('courseId = :courseId', { courseId })
      .execute()
  }

  // update(id: string, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`
  // }

  async remove(id: string) {
    await this.usersRepository.delete(id)
  }
}
