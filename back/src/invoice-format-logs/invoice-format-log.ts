/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm'
import { InvoiceFormatElement } from 'src/invoice-format-elements/invoice-format-element'
import { InvoiceFormat } from 'src/invoice-formats/invoice-format'
import { InvoiceLog } from 'src/invoice-logs/invoice-log'

@Entity({ name: 'invoice_formats_log' })
@ObjectType()
export class InvoiceFormatLog {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => ID)
  id!: string

  @Column({ nullable: false })
  invoiceFormatId!: string

  @CreateDateColumn({ type: 'timestamptz', nullable: false })
  @Field({ nullable: false })
  readonly createdAt!: Date

  @ManyToOne((type) => InvoiceFormat, (format) => format.invoiceFormatsLogs, {
    nullable: false,
  })
  @JoinColumn({ name: 'invoice_format_id' })
  @Field((type) => InvoiceFormat, { nullable: false })
  invoiceFormat!: InvoiceFormat

  @OneToMany((type) => InvoiceLog, (log) => log.invoiceFormatLog)
  invoiceLogs!: InvoiceLog[]

  @OneToMany(
    (type) => InvoiceFormatElement,
    (element) => element.invoiceFormatLog,
  )
  @Field((type) => [InvoiceFormatElement], { nullable: false })
  elements!: InvoiceFormatElement[]
}
