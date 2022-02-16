/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql'

// TODO: uuid振ってテーブル化
@ObjectType('InvoiceFormatElement')
@InputType('InvoiceFormatElementInput')
export class InvoiceFormatElement {
  @Field((type) => Int)
  order: number

  @Field()
  label: string

  @Field()
  own: boolean
}
