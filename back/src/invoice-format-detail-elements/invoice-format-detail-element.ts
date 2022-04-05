/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql'
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm'
import { InvoiceFormatLog } from 'src/invoice-format-logs/invoice-format-log'

export enum DetailElementValueType {
  string = 'string',
  number = 'number',
  date = 'date',
}

registerEnumType(DetailElementValueType, { name: 'DetailElementValueType' })

@Entity({ name: 'invoice_format_detail_elements' })
@ObjectType()
export class InvoiceFormatDetailElement {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => ID)
  id!: string

  @Column()
  @Field((type) => Int)
  order!: number

  @Column()
  @Field()
  label!: string

  @Column({
    type: 'enum',
    enum: DetailElementValueType,
    default: DetailElementValueType.string,
  })
  @Field((type) => DetailElementValueType)
  valueType!: DetailElementValueType

  @Column({ comment: '`true`: ゼネコンが入力。, `false`: 下請けが入力。' })
  @Field({ description: '`true`: ゼネコンが入力。, `false`: 下請けが入力。' })
  own!: boolean

  @Column()
  invoiceFormatLogId!: string

  @ManyToOne((type) => InvoiceFormatLog, (log) => log.detailElements, {
    nullable: false,
  })
  @JoinColumn({ name: 'invoice_format_log_id' })
  invoiceFormatLog!: InvoiceFormatLog
}
