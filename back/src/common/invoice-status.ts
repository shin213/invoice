import { registerEnumType } from '@nestjs/graphql'
import { Request } from 'src/requests/request'

export type RequestPair = {
  receiverRequest: Request
  requesterRequest?: Request
}

export enum InvoiceStatusFromUserView {
  // (自分がReceiverのRequest, 自分がRequesterのRequest)
  // (declined, any)
  declined = 'declined',

  // ([awaiting, approved], not exists)
  // should be (awaiting, not exists)
  approving = 'approving',

  // (approved, awaiting)
  approvedAwaitingNextApproval = 'approvedAwaitingNextApproval',

  // (approved, approved)
  approvedNextApproved = 'approvedNextApproved',

  // any other except completely approved
  // should be (awaiting, rejected)
  handling = 'handling',

  // completely approved
  completelyApproved = 'completelyApproved',
}

registerEnumType(InvoiceStatusFromUserView, {
  name: 'InvoiceStatusFromUserView',
})
