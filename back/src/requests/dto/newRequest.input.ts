import { Field, InputType } from '@nestjs/graphql'
import { RequestStatus } from '../request'

@InputType()
export class NewRequestInput {
  @Field()
  requester_id: number

  @Field()
  invoice_id: number

  @Field()
  status: RequestStatus

  @Field()
  company_id: number
}
