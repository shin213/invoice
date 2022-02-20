/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, Int } from '@nestjs/graphql'
import { MaxLength, Min } from 'class-validator'

@InputType()
export class NewInvoiceFormatInput {
  @Field()
  @MaxLength(100)
  name: string

  @Field((type) => Int)
  @Min(0)
  companyId: number
}
