/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, Int } from '@nestjs/graphql'
import { MaxLength, Min } from 'class-validator'
import { User } from 'src/users/user'
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
