/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, ObjectType } from '@nestjs/graphql'
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

enum RequestStatus {
  requesting,
  approved,
  declined,
  others_approved,
  others_declined,
}

@Entity({ name: 'requests' })
@ObjectType()
export class Request {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number

  @ManyToOne((type) => User, (user) => user.requests)
  @JoinColumn({ name: 'requester_id' })
  @Field((type) => User)
  requester: User

  @ManyToOne((type) => Invoice, (invoice) => invoice.requests)
  @JoinColumn({ name: 'invoice_id' })
  @Field((type) => Invoice)
  invoice: Invoice

  @ManyToOne((type) => Comment, (comment) => comment.requests)
  @JoinColumn({ name: 'comment_id' })
  @Field((type) => Comment)
  comment: Comment

  @Column({ type: 'enum', enum: RequestStatus })
  @Field((type) => RequestStatus)
  status: RequestStatus

  @ManyToOne((type) => Company, (company) => company.requests)
  @JoinColumn({ name: 'company_id' })
  @Field((type) => Company)
  company: Company

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  created_at: Date

  @Field()
  judged_at: Date

  // TODO: requester と合わせて正しい変数名・カラム名に修正
  @ManyToOne((type) => User, (user) => user.judges)
  @JoinColumn({ name: 'judge_user_id' })
  @Field((type) => User)
  judged_by: User

  // TODO: comment と合わせて正しい変数名・カラム名に修正
  @ManyToOne((type) => Comment, (comment) => comment.judges)
  @JoinColumn({ name: 'judge_comment_id' })
  @Field((type) => Comment)
  judge_comment: Comment

  @OneToMany((type) => Comment, (comment) => comment.request)
  comments: Comment[]

  @OneToMany(
    (type) => RequestReceiver,
    (request_receiver) => request_receiver.request,
  )
  request_receivers: RequestReceiver[]
}
