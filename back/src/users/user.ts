/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm'
import { Company } from 'src/companies/company'
import { Comment } from 'src/comments/comment'

@Entity({ name: 'users' })
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
  @Field()
  is_admin: boolean

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  created_at: Date

  @Column()
  company_id: number

  @ManyToOne((type) => Company, (company) => company.users, {
    nullable: false,
  })
  @JoinColumn({ name: 'company_id' })
  @Field((type) => Company)
  company: Company

  @OneToMany((type) => Comment, (comment) => comment.user)
  comments: Comment[]
}
