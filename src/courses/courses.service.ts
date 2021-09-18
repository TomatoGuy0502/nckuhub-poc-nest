import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Course } from './entities/course.entity'

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>
  ) {}

  async findAll() {
    const course = await this.coursesRepository.find({ relations: ['department'] })
    return course
  }

  async findOne(id: number) {
    return await this.coursesRepository.findOne(id, { relations: ['department'] })
  }

  async findOneWithComments(id: number) {
    const course = await this.coursesRepository.findOne(id, {
      relations: ['comments', 'department']
    })
    return course
  }
}
