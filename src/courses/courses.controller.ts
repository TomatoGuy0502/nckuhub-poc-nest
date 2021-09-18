import { Controller, Get, Param } from '@nestjs/common'
import { CoursesService } from './courses.service'

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  findAll() {
    return this.coursesService.findAll()
  }

  @Get(':id')
  findOneWithComments(@Param('id') id: string) {
    return this.coursesService.findOneWithComments(+id)
  }
}
