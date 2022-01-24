/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID } from '@nestjs/graphql'
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { User } from 'src/users/user'
import { Comment } from 'src/comments/comment'
import { Request } from 'src/requests/request'

export class Judgement {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  created_at: Date

  @ManyToOne((type) => User, (user) => user.judgements)
  @JoinColumn({ name: 'user_id' })
  @Field((type) => User)
  user: User

  @ManyToOne((type) => Comment, (comment) => comment.judgements)
  @JoinColumn({ name: 'comment_id' })
  @Field((type) => Comment)
  comment: Comment

  @ManyToOne((type) => Request, (request) => request.judgements)
  @JoinColumn({ name: 'request_id' })
  @Field((type) => Request)
  request: Request
}
