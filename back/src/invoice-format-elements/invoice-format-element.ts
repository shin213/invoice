/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql'

// TODO: module 化
@ObjectType('InvoiceFormatElement')
@InputType('InvoiceFormatElementInput')
export class InvoiceFormatElement {
  @Field((type) => Int)
  order: number

  @Field()
  label: string

  // TODO: enum 化
  @Field()
  value_type: string
}
