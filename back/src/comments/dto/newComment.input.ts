/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class NewCommentInput {
  @Field()
  content: string

  @Field()
  invoice_id: string

  @Field((type) => Int)
  user_id: number

  @Field((type) => Int)
  request_id: number

  judgement_id?: number
}
