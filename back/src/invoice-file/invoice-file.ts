/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType } from '@nestjs/graphql'
import { Invoice } from 'src/invoices/invoice'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'invoice-files' })
@ObjectType()
export class InvoiceFile {
  @PrimaryColumn()
  @Field(() => String)
  readonly pathName!: string

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  readonly createdAt!: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  readonly updatedAt!: Date

  @Column()
  invoiceId!: string

  @JoinColumn({ name: 'invoice_id' })
  @ManyToOne((type) => Invoice, (invoice) => invoice.files)
  invoice!: Invoice
}
