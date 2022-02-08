/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType } from '@nestjs/graphql'
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm'
import { InvoiceLogElement } from 'src/invoice-log-elements/invoice-log-element'
import { InvoiceFormatLog } from 'src/invoice-format-logs/invoice-format-log'

@Entity({ name: 'invoice_log' })
@ObjectType()
export class InvoiceLog {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string

  @Column({ nullable: false })
  invoice_format_log_id: string

  @Column({ type: 'jsonb', nullable: false })
  @Field((type) => [InvoiceLogElement], { nullable: false })
  body: InvoiceLogElement[]

  @ManyToOne(
    (type) => InvoiceFormatLog,
    (invoice_format_log) => invoice_format_log.invoice_logs,
    {
      nullable: false,
    },
  )
  @JoinColumn({ name: 'invoice_format_log_id' })
  @Field((type) => InvoiceFormatLog, { nullable: false })
  invoice_format_log: InvoiceFormatLog
}
