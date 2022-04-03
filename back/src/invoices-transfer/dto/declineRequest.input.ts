import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DeclineRequestInput {
  @Field()
  requestId!: number

  // TODO: add companyId

  @Field()
  comment!: string
}
