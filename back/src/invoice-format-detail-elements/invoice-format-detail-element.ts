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

export enum ElementValueType {
  string = 'string',
  number = 'number',
  date = 'date',
}

registerEnumType(ElementValueType, { name: 'ElementValueType' })

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
    enum: ElementValueType,
    default: ElementValueType.string,
  })
  @Field((type) => ElementValueType)
  valueType!: ElementValueType

  @Column({ comment: '`true`: ゼネコンが入力。, `false`: 下請けが入力。' })
  @Field()
  own!: boolean

  @Column()
  invoiceFormatLogId!: string

  @ManyToOne((type) => InvoiceFormatLog, (log) => log.elements, {
    nullable: false,
  })
  @JoinColumn({ name: 'invoice_format_log_id' })
  invoiceFormatLog!: InvoiceFormatLog
}
