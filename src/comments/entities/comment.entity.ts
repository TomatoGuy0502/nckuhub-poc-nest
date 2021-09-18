import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { User } from 'src/users/entities/user.entity'
import { Course } from 'src/courses/entities/course.entity'

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  text: string

  @Column()
  got: number

  @Column()
  sweet: number

  @Column()
  cold: number

  @Column()
  semester: string

  @Column()
  userId: string

  @Column()
  courseId: number

  @ManyToOne(() => User, (user) => user.comments)
  user: User

  @ManyToOne(() => Course, (course) => course.comments)
  course: Course
}
