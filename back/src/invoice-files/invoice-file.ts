/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType } from '@nestjs/graphql'
import { Invoice } from 'src/invoices/invoice'
import { User } from 'src/users/user'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'invoice_files' })
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
  @Field()
  invoiceId!: string

  @JoinColumn({ name: 'invoice_id' })
  @ManyToOne((type) => Invoice, (invoice) => invoice.invoiceFiles, {
    nullable: false,
  })
  invoice!: Invoice

  @Column((type) => String)
  @Field((type) => String, { nullable: true })
  createdById: string | null = null

  @JoinColumn({ name: 'created_by_id' })
  @ManyToOne((type) => User, (user) => user.invoiceFiles, { nullable: true })
  @Field((type) => User, { nullable: true })
  createdBy: User | null = null
}
