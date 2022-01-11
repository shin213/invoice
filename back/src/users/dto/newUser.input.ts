/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, Int } from '@nestjs/graphql'
import { MaxLength, IsEmail, Min } from 'class-validator'

@InputType()
export class NewUserInput {
  @Field()
  @MaxLength(256)
  @IsEmail()
  email: string

  @Field()
  @MaxLength(256)
  name: string

  @Field()
  is_admin: boolean

  @Field((type) => Int)
  @Min(0)
  company_id: number
}
