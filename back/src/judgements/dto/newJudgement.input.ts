/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, Int } from '@nestjs/graphql'
import { JudgementType } from '../judgement'

@InputType()
export class NewJudgementInput {
  @Field((type) => Int)
  user_id: number

  @Field()
  comment: string

  @Field((type) => Int)
  request_id: number

  @Field()
  type: JudgementType
}
