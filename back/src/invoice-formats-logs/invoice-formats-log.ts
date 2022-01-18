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
import { InvoiceFormatElement } from './invoice-format-element'
import { InvoiceFormat } from 'src/invoice-formats/invoice-format'
import { User } from 'src/users/user'

@Entity({ name: 'invoice_formats_log' })
@ObjectType()
export class InvoiceFormatsLog {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string

  @Column()
  invoice_format_id: number

  @Column()
  created_by: number

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  created_at: Date

  @Column({ type: 'jsonb' })
  @Field((type) => [InvoiceFormatElement])
  body: InvoiceFormatElement[]

  @ManyToOne(
    (type) => InvoiceFormat,
    (invoice_format) => invoice_format.invoice_formats_logs,
    {
      nullable: false,
    },
  )
  @JoinColumn({ name: 'invoice_format_id' })
  @Field((type) => InvoiceFormat)
  invoice_format: InvoiceFormat

  @ManyToOne((type) => User, (user) => user.invoice_formats_logs, {
    nullable: false,
  })
  @JoinColumn({ name: 'created_by' })
  @Field((type) => User)
  user: User
}
