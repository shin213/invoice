/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm'
import { Company } from 'src/companies/company'
import { User } from 'src/users/user'
import { Comment } from 'src/comments/comment'
import { Invoice } from 'src/invoices/invoice'
import { RequestReceiver } from 'src/request-receiver/request-receiver'
import { Judgement } from 'src/judgements/judgement'

export enum RequestStatus {
  requesting = 'requesting',
  approved = 'approved',
  declined = 'declined',
}

registerEnumType(RequestStatus, { name: 'RequestStatus' })

@Entity({ name: 'requests' })
@ObjectType()
export class Request {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  readonly id: number

  @Column({ nullable: false })
  @Field((type) => Int)
  readonly requester_id: number

  @ManyToOne((type) => User, (user) => user.requests, { nullable: false })
  @JoinColumn({ name: 'requester_id' })
  @Field((type) => User, { nullable: false })
  readonly requester: User

  @Column({ nullable: false })
  @Field((type) => Int)
  readonly invoice_id: number

  @ManyToOne((type) => Invoice, (invoice) => invoice.requests, {
    nullable: false,
  })
  @JoinColumn({ name: 'invoice_id' })
  @Field((type) => Invoice, { nullable: false })
  readonly invoice: Invoice

  @Column({ type: 'enum', enum: RequestStatus, nullable: false })
  @Field((type) => RequestStatus, { nullable: false })
  status: RequestStatus

  @Column({ nullable: false })
  @Field((type) => Int)
  readonly company_id: number

  @ManyToOne((type) => Company, (company) => company.requests, {
    nullable: false,
  })
  @JoinColumn({ name: 'company_id' })
  @Field((type) => Company, { nullable: false })
  readonly company: Company

  @CreateDateColumn({ type: 'timestamptz', nullable: false })
  @Field({ nullable: false })
  readonly created_at: Date

  @OneToMany((type) => Comment, (comment) => comment.request)
  @Field((type) => [Comment])
  comments: Promise<Comment[]>

  // 中間テーブルを参照するためqueryで直接取得することはできない
  @OneToMany((type) => User, (user) => user.requests, { lazy: true })
  receivers: User[]

  @OneToMany(
    (type) => RequestReceiver,
    (request_receiver) => request_receiver.request,
  )
  @Field((type) => [RequestReceiver])
  request_receivers: Promise<RequestReceiver[]>

  @OneToMany((type) => Judgement, (judgement) => judgement.request)
  @Field((type) => [Judgement])
  judgements: Promise<Judgement[]>
}
