/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType } from '@nestjs/graphql'
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  OneToMany,
} from 'typeorm'
import { Company } from '../companies/company'
import { InvoiceFormatsLog } from 'src/invoice-formats-logs/invoice-formats-log'

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

  @OneToMany((type) => InvoiceFormatsLog, (log) => log.invoice_format)
  invoice_formats_logs: InvoiceFormatsLog[]
}
