/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm'
import { Company } from 'src/companies/company'
import { User } from 'src/users/user'

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

  @JoinColumn({ name: 'company_id' })
  @Field((type) => Company)
  company: Company

  @Column({ type: 'enum', enum: InvoiceStatus })
  @Field((type) => InvoiceStatus)
  status: InvoiceStatus
}
