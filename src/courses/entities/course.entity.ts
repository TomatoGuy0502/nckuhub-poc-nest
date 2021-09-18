import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { Department } from '../../departments/entities/department.entity'
import { Comment } from '../../comments/entities/comment.entity'
import { Favorite } from 'src/favorites/entities/favorite.entity'
@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Department, (department) => department.course)
  @JoinColumn()
  department: string

  @Column()
  code: number

  @Column()
  name: string

  @Column()
  teacher: string

  @Column()
  time: string

  @Column()
  credit: number

  @Column()
  commentsCount: number

  @OneToMany(() => Comment, (comment) => comment.course)
  comments: Comment[]

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites: Favorite[]
}
