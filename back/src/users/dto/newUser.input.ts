/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, Int } from '@nestjs/graphql'
import { MaxLength, IsEmail, Min, Length } from 'class-validator'

@InputType()
export class NewUserInput {
  @Field()
  @MaxLength(256)
  @IsEmail()
  email!: string

  @Field()
  @Length(1, 256)
  familyName!: string

  @Field()
  @Length(1, 256)
  givenName!: string

  @Field()
  @Length(1, 256)
  familyNameFurigana!: string

  @Field()
  @Length(1, 256)
  givenNameFurigana!: string

  @Field()
  isAdmin!: boolean

  @Field((type) => String, { nullable: false })
  employeeCode!: string

  @Field((type) => Int)
  @Min(0)
  companyId!: number

  @Field((type) => String)
  confirmationCode!: string
}
