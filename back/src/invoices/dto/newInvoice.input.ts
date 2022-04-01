/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, Int } from '@nestjs/graphql'
import { InvoiceStatus } from '../invoice'
import { InvoiceLogElement } from 'src/invoice-log-elements/invoice-log-element'

@InputType()
export class NewInvoiceInput {
  @Field((type) => Int)
  createdById!: number

  @Field((type) => Int)
  companyId!: number

  @Field((type) => InvoiceStatus)
  status!: InvoiceStatus

  @Field()
  invoiceFormatLogId!: string

  @Field((type) => [InvoiceLogElement])
  body!: InvoiceLogElement[]

  @Field((type) => [[InvoiceLogElement]])
  detail!: InvoiceLogElement[][]
}
