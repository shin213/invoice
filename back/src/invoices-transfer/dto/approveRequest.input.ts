import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ApproveRequestInput {
  @Field()
  requestId!: number

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => [String])
  receiverIds!: string[]

  @Field()
  comment!: string
}
