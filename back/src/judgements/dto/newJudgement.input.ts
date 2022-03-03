/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, Int } from '@nestjs/graphql'
import { JudgementType } from '../judgement'

@InputType()
export class NewJudgementInput {
  @Field((type) => Int)
  userId!: number

  @Field()
  comment!: string

  @Field((type) => Int)
  requestId!: number

  @Field()
  type!: JudgementType
}
