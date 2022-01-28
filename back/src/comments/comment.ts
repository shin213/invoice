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
import { Judgement } from 'src/judgements/judgement'

@Entity({ name: 'comments' })
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number

  @Column({ nullable: false })
  @Field({ nullable: false })
  content: string

  @CreateDateColumn({ type: 'timestamptz', nullable: false })
  @Field({ nullable: false })
  created_at: Date

  @ManyToOne((type) => Invoice, (invoice) => invoice.comments, {
    nullable: false,
  })
  @JoinColumn({ name: 'invoice_id' })
  @Field((type) => Invoice, { nullable: false })
  invoice: Invoice

  @ManyToOne((type) => User, (user) => user.comments, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  @Field((type) => User, { nullable: false })
  user: User

  @ManyToOne((type) => Request, (request) => request.comments, {
    nullable: true,
  })
  @JoinColumn({ name: 'request_id' })
  @Field((type) => Request, { nullable: true })
  request: Request | null

  @OneToMany((type) => Judgement, (judgement) => judgement.comment, {
    nullable: false,
  })
  judgements: Judgement[]
}
