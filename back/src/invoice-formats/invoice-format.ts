/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm'
import { Company } from '../companies/company'

@Entity({ name: 'invoice_formats' })
@ObjectType()
export class InvoiceFormat {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number

  @Column({ length: '100' })
  @Field()
  name: string

  @ManyToOne((type) => Company, (company) => company.invoice_formats)
  @JoinColumn({ name: 'company_id' })
  @Field((type) => Company)
  company: Company
}
