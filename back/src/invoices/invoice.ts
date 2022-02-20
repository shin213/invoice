/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm'
import { Company } from 'src/companies/company'
import { User } from 'src/users/user'
import { Comment } from 'src/comments/comment'
import { Request } from 'src/requests/request'
import { Construction } from 'src/constructions/construction'

export enum InvoiceStatus {
  notRequested = 'not_requested',
  requested = 'requested',
  rejected = 'rejected',
  completelyApproved = 'completely_approved',
}

registerEnumType(InvoiceStatus, { name: 'InvoiceStatus' })

@Entity({ name: 'invoices' })
@ObjectType()
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => ID)
  readonly id: string

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  readonly createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  readonly updatedAt: Date

  // 請求日
  @Column({ nullable: true })
  @Field()
  billingDate: Date | null

  // 支払期限
  @Column({ nullable: true })
  @Field()
  dueDateForPayment: Date | null

  // 支払金額(円)
  @Column({ nullable: true })
  @Field()
  paymentAmount: number | null

  @Column({ nullable: true })
  @Field((type) => Int, { nullable: true })
  constructionId: number | null

  @ManyToOne((type) => Construction, (construction) => construction.invoices, {
    nullable: true,
  })
  @JoinColumn({ name: 'construction_id' })
  @Field((type) => Construction, { nullable: true })
  construction: Construction | null

  @Column({ nullable: false })
  @Field((type) => Int)
  readonly createdById: number

  @ManyToOne((type) => User, (user) => user.invoices, { nullable: false })
  @JoinColumn({ name: 'created_by_id' })
  @Field((type) => User, { nullable: false })
  readonly createdBy: User

  @Column({ nullable: false })
  @Field((type) => Int)
  readonly companyId: number

  @ManyToOne((type) => Company, (company) => company.invoices, {
    nullable: false,
  })
  @JoinColumn({ name: 'company_id' })
  @Field((type) => Company, { nullable: false })
  readonly company: Company

  @Column({ type: 'enum', enum: InvoiceStatus, nullable: false })
  @Field((type) => InvoiceStatus, { nullable: false })
  status: InvoiceStatus

  @OneToMany((type) => Comment, (comment) => comment.invoice)
  comments: Comment[]

  @OneToMany((type) => Request, (request) => request.invoice)
  requests: Request[]
}
