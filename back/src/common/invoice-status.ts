import { registerEnumType } from '@nestjs/graphql'
import { Request, RequestStatus } from 'src/requests/request'
import { unreachable } from 'src/utils'

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

export function getInvoiceStatusFromUserView(
  requestPair: RequestPair,
): InvoiceStatusFromUserView {
  const { requesterRequest: req, receiverRequest: receiv } = requestPair

  if (req?.status === RequestStatus.declined) {
    return InvoiceStatusFromUserView.declined
  }

  if (req == undefined) {
    if (receiv.status !== RequestStatus.awaiting) {
      console.error(
        `receiverRequest.status !== RequestStatus.awaiting ${requestPair}`,
      )
    }
    return InvoiceStatusFromUserView.approving
  }

  if (req.status === RequestStatus.approved) {
    if (receiv.status === RequestStatus.approved) {
      return InvoiceStatusFromUserView.approvedNextApproved
    }
    if (receiv.status === RequestStatus.awaiting) {
      return InvoiceStatusFromUserView.approvedAwaitingNextApproval
    }
    if (receiv.status === RequestStatus.declined) {
      console.error(
        'requesterRequest.status === .approved, but receiverRequest.status === .declined\n',
        'Should be (awaiting, rejected)\n',
        `${requestPair}`,
      )
    }
    return InvoiceStatusFromUserView.handling
  }

  if (req.status === RequestStatus.awaiting) {
    if (receiv.status !== RequestStatus.declined) {
      console.error(
        'requesterRequest.status === .awaiting but recevierRequest.status !== .decline',
        'Should be (awaiting, rejected)\n',
        `${requestPair}`,
      )
    }
    return InvoiceStatusFromUserView.handling
  }
  unreachable(req.status)
}
