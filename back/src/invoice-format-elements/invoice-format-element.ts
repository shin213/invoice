/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, Int, ObjectType } from '@nestjs/graphql'
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm'
import { InvoiceFormatLog } from 'src/invoice-format-logs/invoice-format-log'

@Entity({ name: 'invoice_format_elements' })
@ObjectType()
export class InvoiceFormatElement {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => ID)
  id: string

  @Column()
  @Field((type) => Int)
  order: number

  @Column()
  @Field()
  label: string

  @Column()
  @Field()
  own: boolean

  @Column()
  invoice_format_log_id: string

  @ManyToOne((type) => InvoiceFormatLog, (log) => log.elements, {
    nullable: false,
  })
  @JoinColumn({ name: 'invoice_format_log_id' })
  invoiceFormatLog: InvoiceFormatLog
}
