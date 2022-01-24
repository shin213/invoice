/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, Int } from '@nestjs/graphql'
import { Min } from 'class-validator'
import { InvoiceFormatElement } from 'src/invoice-format-elements/invoice-format-element'

@InputType()
export class NewInvoiceFormatInputLog {
  @Field()
  invoice_format_id: string

  @Field((type) => Int)
  @Min(0)
  created_by: number

  @Field((type) => [InvoiceFormatElement])
  body: InvoiceFormatElement[]
}
