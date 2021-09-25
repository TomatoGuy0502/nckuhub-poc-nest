import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'
import { Comment } from './entities/comment.entity'

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>
  ) {}

  async create(userId: string, createCommentDto: CreateCommentDto) {
    const comment = new Comment()
    comment.text = createCommentDto.text
    comment.got = createCommentDto.got
    comment.sweet = createCommentDto.sweet
    comment.cold = createCommentDto.cold
    comment.semester = createCommentDto.semester
    comment.courseId = createCommentDto.courseId
    comment.userId = userId
    return await this.commentRepository.save(comment)
  }

  findAll(): Promise<Comment[]> {
    return this.commentRepository.find()
  }

  findAllByUserId(userId: string): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { userId },
      relations: ['course', 'course.department']
    })
  }

  findOne(id: number): Promise<Comment> {
    return this.commentRepository.findOne(id)
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    return await this.commentRepository.update({ id }, updateCommentDto)
  }

  async remove(id: number) {
    return await this.commentRepository.delete({ id })
  }
}
