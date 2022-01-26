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
import { Request } from 'src/requests/request'
import { RequestReceiver } from 'src/request-receiver/request-receiver'
import { RequestNotification } from 'src/request-notifications/request-notification'
import { Judgement } from 'src/judgements/judgement'
import { InvoiceFormatLog } from 'src/invoice-format-logs/invoice-format-log'

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
  family_name: string

  @Column({ length: '256' })
  @Field()
  given_name: string

  @Column({ length: '256' })
  @Field()
  family_name_furigana: string

  @Column({ length: '256' })
  @Field()
  given_name_furigana: string

  @Column()
  @Field()
  is_admin: boolean

  @Column()
  @Field()
  employee_code: string

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

  @OneToMany((type) => Request, (request) => request.requester)
  requests: Request[]

  @OneToMany((type) => Judgement, (judgement) => judgement.user)
  judgements: Judgement[]

  @OneToMany(
    (type) => RequestReceiver,
    (request_receiver) => request_receiver.receiver,
  )
  request_receivers: RequestReceiver[]

  @OneToMany(
    (type) => RequestNotification,
    (request_notification) => request_notification.user,
  )
  request_notifications: RequestNotification[]

  @OneToMany((type) => InvoiceFormatLog, (log) => log.user)
  invoice_formats_logs: InvoiceFormatLog[]
}
