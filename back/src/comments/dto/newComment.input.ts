/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class NewCommentInput {
  @Field()
  content: string

  @Field((type) => Int)
  invoice_id: number

  @Field((type) => Int)
  user_id: number

  @Field((type) => Int)
  request_id: number

  judgement_id?: number
}
