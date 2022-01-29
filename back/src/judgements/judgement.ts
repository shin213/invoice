/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { User } from 'src/users/user'
import { Comment } from 'src/comments/comment'
import { Request } from 'src/requests/request'

@Entity({ name: 'judgements' })
@ObjectType()
export class Judgement {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  created_at: Date

  @ManyToOne((type) => User, (user) => user.judgements, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  @Field((type) => User)
  user: User

  @ManyToOne((type) => Comment, (comment) => comment.judgements, {
    nullable: false,
  })
  @JoinColumn({ name: 'comment_id' })
  @Field((type) => Comment)
  comment: Comment

  @ManyToOne((type) => Request, (request) => request.judgements, {
    nullable: false,
  })
  @JoinColumn({ name: 'request_id' })
  @Field((type) => Request)
  request: Request
}
