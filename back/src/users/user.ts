/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, Int, ObjectType } from '@nestjs/graphql'
import {
  Entity,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  ManyToMany,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Company } from 'src/companies/company'
import { Comment } from 'src/comments/comment'
import { Request } from 'src/requests/request'
import { RequestReceiver } from 'src/request-receiver/request-receiver'
import { RequestNotification } from 'src/request-notifications/request-notification'
import { Judgement } from 'src/judgements/judgement'
import { Invoice } from 'src/invoices/invoice'

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => ID)
  id!: string

  @Index()
  @Column({ length: '256', nullable: false, unique: true })
  @Field({ nullable: false })
  email!: string

  @Column({ length: '256', nullable: false })
  @Field({ nullable: false })
  familyName!: string

  @Column({ length: '256', nullable: false })
  @Field({ nullable: false })
  givenName!: string

  @Column({ length: '256', nullable: false })
  @Field({ nullable: false })
  familyNameFurigana!: string

  @Column({ length: '256', nullable: false })
  @Field({ nullable: false })
  givenNameFurigana!: string

  @Column({ nullable: false })
  @Field({ nullable: false })
  isAdmin!: boolean

  @Column('varchar', { nullable: false, default: '' })
  @Field()
  employeeCode!: string

  @CreateDateColumn({ type: 'timestamptz', nullable: false })
  @Field({ nullable: false })
  readonly createdAt!: Date

  @Column({ nullable: false })
  @Field((type) => Int)
  readonly companyId!: number

  @ManyToOne((type) => Company, (company) => company.users, {
    nullable: false,
  })
  @JoinColumn({ name: 'company_id' })
  @Field((type) => Company, { nullable: false })
  company!: Company

  @OneToMany((type) => Invoice, (invoice) => invoice.createdBy)
  invoices!: Invoice[]

  @OneToMany((type) => Comment, (comment) => comment.user)
  comments!: Comment[]

  @OneToMany((type) => Request, (request) => request.requester)
  requests!: Request[]

  @OneToMany((type) => Judgement, (judgement) => judgement.user)
  judgements!: Judgement[]

  @OneToMany(
    (type) => RequestReceiver,
    (requestReceiver) => requestReceiver.receiver,
  )
  requestReceivers!: RequestReceiver[]

  @ManyToMany((type) => Request, (request) => request.receivers)
  receivedRequests!: Request[]

  @OneToMany(
    (type) => RequestNotification,
    (requestNotification) => requestNotification.user,
  )
  requestNotifications!: RequestNotification[]
}
