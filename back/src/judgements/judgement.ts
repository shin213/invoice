/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql'
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
  OneToMany,
} from 'typeorm'
import { User } from 'src/users/user'
import { Comment } from 'src/comments/comment'
import { Request } from 'src/requests/request'

export enum JudgementType {
  approve,
  decline,
}

registerEnumType(JudgementType, { name: 'JudgementType' })

@Entity({ name: 'judgements' })
@ObjectType()
export class Judgement {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  created_at: Date

  @Column({ type: 'enum', enum: JudgementType })
  @Field((type) => JudgementType)
  type: JudgementType

  @Column({ nullable: false })
  @Field((type) => Int)
  user_id: number

  @ManyToOne((type) => User, (user) => user.judgements, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  @Field((type) => User)
  user: User

  @OneToMany((type) => Comment, (comment) => comment.judgement, {
    nullable: true,
  })
  @Field((type) => [Comment])
  comments: Promise<Comment[]>

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
