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

  // 全請求書の共通項目（該当のInvoiceFormatElement.idを持つ）
  @Column({
    nullable: true,
    comment: '[共通項目] 工事名',
  })
  @Field({ nullable: true })
  constructionNameId?: string
  // ※ @nestjs/graphql が String type を提供していないので string | null という書き方ができない

  @Column({
    nullable: true,
    comment: '[共通項目] 請求日',
  })
  @Field({ nullable: true })
  billingDateId?: string

  @Column({
    nullable: true,
    comment: '[共通項目] 支払期限',
  })
  @Field((type) => String, { nullable: true })
  paymentDeadlineId?: string

  @Column({
    nullable: true,
    comment: '[共通項目] 支払金額',
  })
  @Field((type) => String, { nullable: true })
  paymentAmountId?: string

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
