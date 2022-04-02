/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, InputType, Int } from '@nestjs/graphql'
import { InvoiceStatus } from '../invoice'
import { InvoiceLogElement } from 'src/invoice-log-elements/invoice-log-element'

@InputType()
export class NewInvoiceInput {
  @Field((type) => ID)
  createdById!: string

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
