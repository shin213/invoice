/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, Int } from '@nestjs/graphql'
import { IsRead, NotificationRequestType } from '../request-notification'

@InputType()
export class NewRequestNotificationInput {
  @Field((type) => Int)
  userId!: number

  @Field()
  isRead!: IsRead

  @Field()
  type!: NotificationRequestType

  @Field((type) => Int)
  requestReceiverId!: number
}
