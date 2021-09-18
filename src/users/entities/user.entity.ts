import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'
import { Comment } from 'src/comments/entities/comment.entity'
import { Favorite } from 'src/favorites/entities/favorite.entity'

@Entity('users')
export class User {
  @PrimaryColumn()
  id: string

  @Column()
  displayName: string

  @Column()
  email: string

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites: Favorite[]

  @OneToMany(() => Comment, (comment) => comment.id)
  comments: Comment[]
}
