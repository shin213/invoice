/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql'

@ObjectType('InvoiceLogElement')
@InputType('InvoiceLogElementInput')
export class InvoiceLogElement {
  @Field()
  label: string

  @Field()
  value: string
}
