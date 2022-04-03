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
import { InvoiceLogElement } from 'src/invoice-log-elements/invoice-log-element'
import { InvoiceLogDetailElement } from 'src/invoice-log-detail-elements/invoice-log-detail-element'
import { InvoiceFormatLog } from 'src/invoice-format-logs/invoice-format-log'

export enum InvoiceStatus {
  inputtingWithSystem = 'inputting_with_system',
  inputtingFile = 'inputting_file',
  awaitingReceipt = 'awaiting_receipt',
  underApproval = 'under_approval',
  completelyApproved = 'completely_approved',
}

registerEnumType(InvoiceStatus, { name: 'InvoiceStatus' })

@Entity({ name: 'invoices' })
@ObjectType()
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => ID)
  readonly id!: string

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  readonly createdAt!: Date

  @Column({ type: 'timestamptz', default: () => 'now()' })
  @Field()
  updatedDataAt!: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  readonly updatedAt!: Date

  // 請求日
  @Column('timestamptz', { nullable: true })
  @Field((type) => Date, { nullable: true })
  billingDate: Date | null = null

  // 支払期限
  @Column('timestamptz', { nullable: true })
  @Field((type) => Date, { nullable: true })
  dueDateForPayment: Date | null = null

  // 支払金額(円)
  @Column('int', { nullable: true })
  @Field((type) => Int, { nullable: true })
  paymentAmount: number | null = null

  @Column({ nullable: true })
  @Field((type) => Int, { nullable: true })
  constructionId: number | null = null

  @ManyToOne((type) => Construction, (construction) => construction.invoices, {
    nullable: true,
  })
  @JoinColumn({ name: 'construction_id' })
  @Field((type) => Construction, { nullable: true })
  construction: Construction | null = null

  @Column({ nullable: false })
  @Field((type) => String)
  readonly createdById!: string

  @ManyToOne((type) => User, (user) => user.invoices, { nullable: false })
  @JoinColumn({ name: 'created_by_id' })
  @Field((type) => User, { nullable: false })
  readonly createdBy!: User

  @Column({ nullable: false })
  @Field((type) => Int)
  readonly companyId!: number

  @ManyToOne((type) => Company, (company) => company.invoices, {
    nullable: false,
  })
  @JoinColumn({ name: 'company_id' })
  @Field((type) => Company, { nullable: false })
  readonly company!: Company

  @Column({ nullable: false })
  invoiceFormatLogId!: string

  @ManyToOne((type) => InvoiceFormatLog, (fmtLog) => fmtLog.invoices, {
    nullable: false,
  })
  @JoinColumn({ name: 'invoice_format_log_id' })
  @Field((type) => InvoiceFormatLog, { nullable: false })
  invoiceFormatLog!: InvoiceFormatLog

  @Column({ type: 'jsonb', nullable: false })
  @Field((type) => [InvoiceLogElement], { nullable: false })
  body!: InvoiceLogElement[]

  @Column({ type: 'jsonb', nullable: false })
  @Field((type) => [[InvoiceLogDetailElement]], { nullable: false })
  detail!: InvoiceLogDetailElement[][]

  @Column({ type: 'enum', enum: InvoiceStatus, nullable: false })
  @Field((type) => InvoiceStatus, { nullable: false })
  status!: InvoiceStatus

  @OneToMany((type) => Comment, (comment) => comment.invoice)
  comments!: Promise<Comment[]>

  @OneToMany((type) => Request, (request) => request.invoice)
  requests!: Promise<Request[]>
}
