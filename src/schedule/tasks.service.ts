import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { EntityManager } from 'typeorm'

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name)

  constructor(private entityManager: EntityManager) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  updateCommentsCount() {
    this.entityManager.query(
      `update courses set commentsCount = 
        (select count(*) from comments 
        where courses.id = comments.courseId)`
    )
    this.logger.verbose('更新心得數量')
  }
}
