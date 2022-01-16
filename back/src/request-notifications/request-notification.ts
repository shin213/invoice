/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { RequestReceiver } from 'src/request-receiver/request-receiver'
import { User } from 'src/users/user'

enum IsRead {
  read = 'read',
  unread = 'unread',
}

@Entity({ name: 'request_notifications' })
@ObjectType()
export class RequestNotification {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number

  @ManyToOne((type) => User, (user) => user.request_notifications)
  @JoinColumn({ name: 'user_id' })
  @Field((type) => User)
  user: User

  @Column({ type: 'enum', enum: IsRead })
  @Field((type) => IsRead)
  is_read: IsRead

  @ManyToOne(
    (type) => RequestReceiver,
    (request_receiver) => request_receiver.request_notifications,
  )
  @JoinColumn({ name: 'request_receiver_id' })
  @Field((type) => RequestReceiver)
  request_receiver: RequestReceiver
}
