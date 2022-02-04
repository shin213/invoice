/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { RequestReceiver } from 'src/request-receiver/request-receiver'
import { User } from 'src/users/user'

export enum IsRead {
  read = 'read',
  unread = 'unread',
}

export enum NotificationRequestType {
  request_coming = 'request_coming',
  request_accepted = 'request_accepted',
  request_declined = 'request_declined',
}

registerEnumType(IsRead, { name: 'IsRead' })
registerEnumType(NotificationRequestType, { name: 'NotificationRequestType' })

@Entity({ name: 'request_notifications' })
@ObjectType()
export class RequestNotification {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number

  @Column({ nullable: false })
  @Field((type) => Int)
  user_id: number

  @ManyToOne((type) => User, (user) => user.request_notifications, {
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  @Field((type) => User)
  user: User

  @Column({ type: 'enum', enum: IsRead })
  @Field((type) => IsRead)
  is_read: IsRead

  @Column({ type: 'enum', enum: NotificationRequestType })
  @Field((type) => NotificationRequestType)
  type: NotificationRequestType

  @Column({ nullable: false })
  @Field((type) => Int)
  request_receiver_id: number

  @ManyToOne(
    (type) => RequestReceiver,
    (request_receiver) => request_receiver.request_notifications,
    { nullable: false },
  )
  @JoinColumn({ name: 'request_receiver_id' })
  @Field((type) => RequestReceiver)
  request_receiver: RequestReceiver
}
