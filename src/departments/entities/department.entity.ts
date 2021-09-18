import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'
import { Course } from '../../courses/entities/course.entity'

@Entity('departments')
export class Department {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @OneToMany(() => Course, (course) => course.department)
  course: Course[]
}
