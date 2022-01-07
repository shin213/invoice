/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
@ObjectType()
export class Company {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number

  @Column({ length: '50' })
  @Field()
  name: string
}
