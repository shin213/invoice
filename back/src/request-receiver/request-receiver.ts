/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, Int, ObjectType } from '@nestjs/graphql'
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Column,
} from 'typeorm'
import { User } from 'src/users/user'
import { Request } from 'src/requests/request'
import { RequestNotification } from 'src/request-notifications/request-notification'

@Entity({ name: 'request_receiver' })
@ObjectType()
export class RequestReceiver {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id!: number

  @Column({ nullable: false })
  @Field((type) => Int)
  requestId!: number

  @ManyToOne((type) => Request, (request) => request.receivers, {
    nullable: false,
  })
  @JoinColumn({ name: 'request_id' })
  @Field((type) => Request)
  request!: Request

  @Column({ nullable: false })
  @Field((type) => Int)
  receiverId!: number

  @ManyToOne((type) => User, (receiver) => receiver.receivedRequests, {
    nullable: false,
  })
  @JoinColumn({ name: 'receiver_id' })
  @Field((type) => User)
  receiver!: User

  @OneToMany(
    (type) => RequestNotification,
    (requestNotification) => requestNotification.requestReceiver,
  )
  requestNotifications!: RequestNotification[]
}
