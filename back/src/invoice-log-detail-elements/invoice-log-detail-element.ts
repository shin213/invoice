/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, ObjectType } from '@nestjs/graphql'

@ObjectType('InvoiceLogDetailElement')
@InputType('InvoiceLogDetailElementInput')
export class InvoiceLogDetailElement {
  @Field()
  elementId!: string

  @Field()
  value!: string
}
