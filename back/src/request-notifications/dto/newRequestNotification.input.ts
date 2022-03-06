/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, InputType, Int } from '@nestjs/graphql'
import { IsRead, NotificationRequestType } from '../request-notification'

@InputType()
export class NewRequestNotificationInput {
  @Field((type) => ID)
  userId!: string

  @Field()
  isRead!: IsRead

  @Field()
  type!: NotificationRequestType

  @Field((type) => Int)
  requestReceiverId!: number
}
