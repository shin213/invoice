/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, InputType, Int } from '@nestjs/graphql'
import { JudgementType } from '../judgement'

@InputType()
export class NewJudgementInput {
  @Field((type) => ID)
  userId!: string

  @Field()
  comment!: string

  @Field((type) => Int)
  requestId!: number

  @Field()
  type!: JudgementType
}
