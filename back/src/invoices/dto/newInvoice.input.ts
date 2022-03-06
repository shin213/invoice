/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, InputType, Int } from '@nestjs/graphql'
import { InvoiceStatus } from '../invoice'

@InputType()
export class NewInvoiceInput {
  @Field((type) => ID)
  userId!: string

  @Field((type) => Int)
  companyId!: number

  @Field((type) => Int)
  status!: InvoiceStatus
}
