/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql'
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'invoice_log_detail_elements' })
@ObjectType('InvoiceLogDetailElement')
@InputType('InvoiceLogDetailElementInput')
export class InvoiceLogDetailElement {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => ID)
  elementId!: string

  @Column({ nullable: false })
  @Field({ nullable: false })
  value!: string
}
