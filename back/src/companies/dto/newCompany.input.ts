/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType } from '@nestjs/graphql'
import { MaxLength } from 'class-validator'
import { Prefecture } from 'src/common/prefecture'

@InputType()
export class NewCompanyInput {
  @Field()
  @MaxLength(50)
  name!: string

  @Field((type) => String, { nullable: true })
  phoneNumber: string | null = null

  @Field((type) => String, { nullable: true })
  postalCode: string | null = null

  @Field((type) => Prefecture, { nullable: true })
  prefecture: Prefecture | null = null

  @Field((type) => String, { nullable: true })
  city: string | null = null

  @Field((type) => String, { nullable: true })
  restAddress: string | null = null
}
