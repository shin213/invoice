/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { User } from 'src/users/user'
import { Invoice } from 'src/invoices/invoice'

@Entity({ name: 'commets' })
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number

  @Column({ length: '255' }) // temporary constant
  @Field()
  content: string

  @ManyToOne((type) => Invoice, (invoice) => invoice.comments)
  @JoinColumn({ name: 'invoice_id' })
  @Field((type) => Invoice)
  invoice: Invoice

  @ManyToOne((type) => User, (user) => user.comments)
  @JoinColumn({ name: 'user_id' })
  @Field((type) => User)
  user: User

  // Pre-defined field of Request Model
  // @ManyToOne((type) => Request, (request) => request.comments)
  // @JoinColumn({ name: 'request_id' })
  // @Field((type) => Request)
  // request: Request
}
