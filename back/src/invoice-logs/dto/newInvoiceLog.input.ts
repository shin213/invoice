/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType } from '@nestjs/graphql'
import { InvoiceLogElement } from 'src/invoice-log-elements/invoice-log-element'

@InputType()
export class NewInvoiceLogInputLog {
  @Field()
  invoice_format_log_id: string

  @Field((type) => [InvoiceLogElement])
  body: InvoiceLogElement[]
}
