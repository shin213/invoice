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

enum InvoiceStatus {
  NOT_REQUESTED,
  REQUESTED,
  COMPLETELY_APPROVED,
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
}
