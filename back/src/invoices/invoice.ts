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
  UpdateDateColumn,
} from 'typeorm'
import { Company } from 'src/companies/company'
import { User } from 'src/users/user'
import { Comment } from 'src/comments/comment'
import { Request } from 'src/requests/request'
import { Construction } from 'src/constructions/construction'

export enum InvoiceStatus {
  not_requested = 'not_requested',
  requested = 'requested',
  rejected = 'rejected',
  completely_approved = 'completely_approved',
}

registerEnumType(InvoiceStatus, { name: 'InvoiceStatus' })

@Entity({ name: 'invoices' })
@ObjectType()
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  readonly id: string

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  readonly created_at: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  readonly updated_at: Date

  // 請求日
  @Column({ nullable: true })
  @Field()
  billing_date: Date | null

  // 支払期限
  @Column({ nullable: true })
  @Field()
  due_date_for_payment: Date | null

  // 支払金額(円)
  @Column({ nullable: true })
  @Field()
  payment_amount: number | null

  @Column({ nullable: true })
  @Field((type) => Int, { nullable: true })
  construction_id: number | null

  @ManyToOne((type) => Construction, (construction) => construction.invoices, {
    nullable: true,
  })
  @JoinColumn({ name: 'construction_id' })
  @Field((type) => Construction, { nullable: true })
  construction: Construction | null

  @Column({ nullable: false })
  @Field((type) => Int)
  readonly created_by_id: number

  @ManyToOne((type) => User, (user) => user.invoices, { nullable: false })
  @JoinColumn({ name: 'created_by_id' })
  @Field((type) => User, { nullable: false })
  readonly created_by: User

  @Column({ nullable: false })
  @Field((type) => Int)
  readonly company_id: number

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
