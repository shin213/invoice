/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType } from '@nestjs/graphql'
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
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

  @CreateDateColumn({ type: 'timestamptz', nullable: false })
  @Field({ nullable: false })
  created_at: Date

  @Column({ type: 'jsonb', nullable: false })
  @Field((type) => [InvoiceLogElement], { nullable: false })
  body: InvoiceLogElement[]

  @ManyToOne((type) => InvoiceFormatLog, (fmtLog) => fmtLog.invoiceLogs, {
    nullable: false,
  })
  @JoinColumn({ name: 'invoice_format_log_id' })
  @Field((type) => InvoiceFormatLog, { nullable: false })
  invoice_format_log: InvoiceFormatLog
}
