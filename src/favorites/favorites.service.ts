import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateFavoriteDto } from './dto/create-favorite.dto'
import { RemoveFavoriteDto } from './dto/remove-favorite.dto'
import { Favorite } from './entities/favorite.entity'

@Injectable()
export class FavoritesService {
  constructor(@InjectRepository(Favorite) private favoritesRepository: Repository<Favorite>) {}

  async findUserFavorites(userId: string) {
    const data = await this.favoritesRepository.find({
      where: { userId },
      relations: ['course', 'course.department']
    })
    return data.map((favorite) => favorite.course)
  }

  async createUserFavorite(userId: string, createFavoriteDto: CreateFavoriteDto) {
    const { courseId } = createFavoriteDto
    return await this.favoritesRepository.save({ courseId, userId })
  }

  async removeUserFavorite(userId: string, removeFavoriteDto: RemoveFavoriteDto) {
    const { courseId } = removeFavoriteDto
    return await this.favoritesRepository.delete({ userId, courseId })
  }
}
