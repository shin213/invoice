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
import { Request } from 'src/requests/request'

export enum InvoiceStatus {
  not_requested = 'not_requested',
  requested = 'requested',
  completely_approved = 'completely_approved',
}

@Entity({ name: 'inovices' })
@ObjectType()
export class Invoice {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  created_at: Date

  @JoinColumn({ name: 'user_id' })
  @Field((type) => User)
  created_by: User

  @ManyToOne((type) => Company, (company) => company.invoices)
  @JoinColumn({ name: 'company_id' })
  @Field((type) => Company)
  company: Company

  @Column({ type: 'enum', enum: InvoiceStatus })
  @Field((type) => InvoiceStatus)
  status: InvoiceStatus

  @OneToMany((type) => Comment, (comment) => comment.invoice)
  comments: Comment[]

  @OneToMany((type) => Request, (request) => request.invoice)
  requests: Request[]
}
