/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, Int, ObjectType } from '@nestjs/graphql'
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
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string

  @Column({ length: '100' })
  @Field()
  name: string

  @Column()
  company_id: number

  @ManyToOne((type) => Company, (company) => company.invoice_formats, {
    nullable: false,
  })
  @JoinColumn({ name: 'company_id' })
  @Field((type) => Company)
  company: Company
}
