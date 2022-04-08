/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType } from '@nestjs/graphql'
import { MaxLength, IsEmail } from 'class-validator'

@InputType()
export class UpdateUnconfirmedUserInput {
  @Field()
  @MaxLength(256)
  @IsEmail()
  email!: string

  @Field()
  @MaxLength(256)
  familyName!: string

  @Field()
  @MaxLength(256)
  givenName!: string

  @Field()
  @MaxLength(256)
  familyNameFurigana!: string

  @Field()
  @MaxLength(256)
  givenNameFurigana!: string

  @Field()
  isAdmin!: boolean

  @Field((type) => String, { nullable: false })
  employeeCode!: string
}
