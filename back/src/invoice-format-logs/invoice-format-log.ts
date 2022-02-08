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
import { User } from 'src/users/user'
import { InvoiceLog } from 'src/invoice-logs/invoice-log'

@Entity({ name: 'invoice_formats_log' })
@ObjectType()
export class InvoiceFormatLog {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => ID)
  id: string

  @Column({ nullable: false })
  invoice_format_id: string

  @Column({ nullable: false })
  created_by: number

  @CreateDateColumn({ type: 'timestamptz', nullable: false })
  @Field({ nullable: false })
  created_at: Date

  @Column({ type: 'jsonb', nullable: false })
  @Field((type) => [InvoiceFormatElement], { nullable: false })
  body: InvoiceFormatElement[]

  @ManyToOne(
    (type) => InvoiceFormat,
    (invoice_format) => invoice_format.invoice_formats_logs,
    {
      nullable: false,
    },
  )
  @JoinColumn({ name: 'invoice_format_id' })
  @Field((type) => InvoiceFormat, { nullable: false })
  invoice_format: InvoiceFormat

  @ManyToOne((type) => User, (user) => user.invoice_formats_logs, {
    nullable: false,
  })
  @JoinColumn({ name: 'created_by' })
  @Field((type) => User, { nullable: false })
  user: User

  @OneToMany((type) => InvoiceLog, (log) => log.invoice_format_log)
  invoice_logs: InvoiceLog[]
}
