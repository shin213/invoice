/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm'
import { User } from 'src/users/user'
import { Invoice } from 'src/invoices/invoice'
import { Request } from 'src/requests/request'

@Entity({ name: 'commets' })
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number

  @Column()
  @Field()
  content: string

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  created_at: Date

  @ManyToOne((type) => Invoice, (invoice) => invoice.comments)
  @JoinColumn({ name: 'invoice_id' })
  @Field((type) => Invoice)
  invoice: Invoice

  @ManyToOne((type) => User, (user) => user.comments)
  @JoinColumn({ name: 'user_id' })
  @Field((type) => User)
  user: User

  @ManyToOne((type) => Request, (request) => request.comments)
  @JoinColumn({ name: 'request_id' })
  @Field((type) => Request)
  request: Request

  @OneToMany((type) => Request, (request) => request.comment)
  requests: Request[]

  @OneToMany((type) => Request, (request) => request.judge_comment)
  judges: Request[]
}
