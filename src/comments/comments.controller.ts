import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
  Request,
  ForbiddenException
} from '@nestjs/common'
import { CommentsService } from './comments.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'
import { AuthGuard } from '@nestjs/passport'

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  findAll(@Query('userId') userId: string) {
    if (!userId) {
      return this.commentsService.findAll()
    }
    return this.commentsService.findAllByUserId(userId)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id)
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @Request() req) {
    const { uid } = req.user
    return this.commentsService.create(uid, createCommentDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @Request() req
  ) {
    const { uid } = req.user
    const data = await this.commentsService.findOne(+id)
    if (uid !== data.userId) {
      throw new ForbiddenException()
    }
    return this.commentsService.update(+id, updateCommentDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    const { uid } = req.user
    const data = await this.commentsService.findOne(+id)
    if (uid !== data.userId) {
      throw new ForbiddenException()
    }
    return this.commentsService.remove(+id)
  }
}
