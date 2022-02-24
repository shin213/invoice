/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType } from '@nestjs/graphql'
import { InvoiceLogElement } from 'src/invoice-log-elements/invoice-log-element'

@InputType()
export class UpdateInvoiceLogInput {
  @Field()
  id: string

  @Field((type) => [InvoiceLogElement])
  body: InvoiceLogElement[]
}
