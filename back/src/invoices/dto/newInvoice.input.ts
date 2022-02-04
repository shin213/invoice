import { Field, InputType } from '@nestjs/graphql'
import { InvoiceStatus } from '../invoice'

@InputType()
export class NewInvoiceInput {
  @Field()
  user_id: number

  @Field()
  company_id: number

  @Field()
  status: InvoiceStatus
}
