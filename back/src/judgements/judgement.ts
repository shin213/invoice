/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, Int, ObjectType } from '@nestjs/graphql'
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
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

  @Column({ nullable: false })
  @Field((type) => Int)
  user_id: number

  @ManyToOne((type) => User, (user) => user.judgements, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  @Field((type) => User)
  user: User

  @Column({ nullable: false })
  @Field((type) => Int)
  comment_id: number

  @ManyToOne((type) => Comment, (comment) => comment.judgements, {
    nullable: false,
  })
  @JoinColumn({ name: 'comment_id' })
  @Field((type) => Comment)
  comment: Comment

  @Column({ nullable: false })
  @Field((type) => Int)
  request_id: number

  @ManyToOne((type) => Request, (request) => request.judgements, {
    nullable: false,
  })
  @JoinColumn({ name: 'request_id' })
  @Field((type) => Request)
  request: Request
}
