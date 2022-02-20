/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, Int } from '@nestjs/graphql'
import { InvoiceStatus } from '../invoice'

@InputType()
export class NewInvoiceInput {
  @Field((type) => Int)
  userId: number

  @Field((type) => Int)
  companyId: number

  @Field((type) => Int)
  status: InvoiceStatus
}
