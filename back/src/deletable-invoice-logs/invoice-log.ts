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
import { InvoiceLogDetailElement } from 'src/invoice-log-detail-elements/invoice-log-detail-element'
import { InvoiceFormatLog } from 'src/invoice-format-logs/invoice-format-log'

@Entity({ name: 'invoice_log' })
@ObjectType()
export class InvoiceLog {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id!: string

  @Column({ nullable: false })
  invoiceFormatLogId!: string

  @CreateDateColumn({ type: 'timestamptz', nullable: false })
  @Field({ nullable: false })
  readonly createdAt!: Date

  @ManyToOne((type) => InvoiceFormatLog, (fmtLog) => fmtLog.invoices, {
    nullable: false,
  })
  @JoinColumn({ name: 'invoice_format_log_id' })
  @Field((type) => InvoiceFormatLog, { nullable: false })
  invoiceFormatLog!: InvoiceFormatLog

  @Column({ type: 'jsonb', nullable: false })
  @Field((type) => [InvoiceLogElement], { nullable: false })
  body!: InvoiceLogElement[]

  @Column({ type: 'jsonb', nullable: false })
  @Field((type) => [[InvoiceLogDetailElement]], { nullable: false })
  detail!: InvoiceLogDetailElement[][]
}
