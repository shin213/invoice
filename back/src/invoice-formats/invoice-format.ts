/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  OneToMany,
} from 'typeorm'
import { Company } from '../companies/company'
import { InvoiceFormatLog } from 'src/invoice-format-logs/invoice-format-log'

@Entity({ name: 'invoice_formats' })
@ObjectType()
export class InvoiceFormat {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => ID)
  id: string

  @Column({ length: '100', nullable: false })
  @Field({ nullable: false })
  name: string

  @Column({ nullable: false })
  company_id: number

  @ManyToOne((type) => Company, (company) => company.invoice_formats, {
    nullable: false,
  })
  @JoinColumn({ name: 'company_id' })
  @Field((type) => Company, { nullable: false })
  company: Company

  @OneToMany((type) => InvoiceFormatLog, (log) => log.invoiceFormat)
  invoice_formats_logs: InvoiceFormatLog[]
}
