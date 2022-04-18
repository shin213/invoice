/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, Int, ObjectType } from '@nestjs/graphql'
import { Construction } from 'src/constructions/construction'
import { User } from 'src/users/user'
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity({ name: 'construction_user' })
@Index(['constructionId', 'userId'], { unique: true })
@ObjectType()
export class ConstructionUser {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => ID)
  id!: string

  @Column({ nullable: false })
  @Field((type) => Int)
  constructionId!: number

  @ManyToOne(
    (type) => Construction,
    (construction) => construction.constructionUsers,
    { nullable: false },
  )
  @JoinColumn({ name: 'construction_id' })
  @Field((type) => Construction)
  construction!: Construction

  @Column({ nullable: false })
  userId!: string

  @ManyToOne((type) => User, (user) => user.constructionUsers, {
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  @Field((type) => User)
  user!: User
}
