/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql'
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
  approve = 'approve',
  decline = 'decline',
}

registerEnumType(JudgementType, { name: 'JudgementType' })

@Entity({ name: 'judgements' })
@ObjectType()
export class Judgement {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  readonly id!: number

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  readonly createdAt!: Date

  @Column({ type: 'enum', enum: JudgementType })
  @Field((type) => JudgementType)
  type!: JudgementType

  @Column({ nullable: false })
  @Field((type) => Int)
  readonly userId!: number

  @ManyToOne((type) => User, (user) => user.judgements, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  @Field((type) => User)
  readonly user!: User

  @OneToMany((type) => Comment, (comment) => comment.judgement, {
    nullable: true,
  })
  @Field((type) => [Comment])
  comments!: Promise<Comment[]>

  @Column({ nullable: false })
  @Field((type) => Int)
  readonly requestId!: number

  @ManyToOne((type) => Request, (request) => request.judgements, {
    nullable: false,
  })
  @JoinColumn({ name: 'request_id' })
  @Field((type) => Request)
  readonly request!: Request
}
