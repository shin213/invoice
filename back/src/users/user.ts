/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, ObjectType, Int } from '@nestjs/graphql'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm'

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number

  @Column({ length: '256' })
  @Field()
  email: string

  @Column({ length: '256' })
  @Field()
  name: string

  @Column()
  @Field((type) => Int)
  isAdmin: number

  @CreateDateColumn()
  @Field()
  createdAt: Date
}
