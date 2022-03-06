/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, ObjectType } from '@nestjs/graphql'

@ObjectType('InvoiceLogElement')
@InputType('InvoiceLogElementInput')
export class InvoiceLogElement {
  @Field()
  elementId!: string

  @Field()
  value!: string
}
