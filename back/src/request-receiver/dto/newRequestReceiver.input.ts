import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class NewRequestReceiverInput {
  @Field()
  receiver_id: number

  @Field()
  request_id: number

  @Field()
  id: number // TODO: なぜか必要、要調査
}
