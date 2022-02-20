/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, Int, ObjectType } from '@nestjs/graphql'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
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
  @Field((type) => Int)
  id: number

  @Column({ nullable: false })
  @Field({ nullable: false })
  content: string

  @CreateDateColumn({ type: 'timestamptz', nullable: false })
  @Field({ nullable: false })
  readonly createdAt: Date

  @Column({ nullable: false })
  @Field()
  invoiceId: string

  @ManyToOne((type) => Invoice, (invoice) => invoice.comments, {
    nullable: false,
  })
  @JoinColumn({ name: 'invoice_id' })
  @Field((type) => Invoice, { nullable: false })
  invoice: Invoice

  @Column({ nullable: false })
  @Field((type) => Int)
  userId: number

  @ManyToOne((type) => User, (user) => user.comments, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  @Field((type) => User, { nullable: false })
  user: User

  @Column({ nullable: true })
  @Field((type) => Int)
  requestId: number | null

  @ManyToOne((type) => Request, (request) => request.comments, {
    nullable: true,
  })
  @JoinColumn({ name: 'request_id' })
  @Field((type) => Request, { nullable: true })
  request: Request | null

  @Column({ nullable: true })
  @Field((type) => Int, { nullable: true })
  judgementId: number | null

  @ManyToOne((type) => Judgement, (judgement) => judgement.comments, {
    nullable: true,
  })
  @JoinColumn({ name: 'judgement_id' })
  @Field((type) => Judgement, { nullable: true })
  judgement: Judgement | null
}
