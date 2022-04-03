import { registerEnumType } from '@nestjs/graphql'
import { Request, RequestStatus } from 'src/requests/request'
import { unreachable } from 'src/utils'

export type RequestPair = {
  receiverRequest?: Request
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
  // should be (awaiting, declined)
  handling = 'handling',

  // completely approved
  completelyApproved = 'completelyApproved',
}

registerEnumType(InvoiceStatusFromUserView, {
  name: 'InvoiceStatusFromUserView',
})

// getInvoiceStatusFromUserView does not check if the invoice is completely approved.
export function getInvoiceStatusFromUserView(
  requestPair: RequestPair,
): InvoiceStatusFromUserView {
  const { receiverRequest: receiv, requesterRequest: req } = requestPair

  if (receiv == undefined) {
    // TODO: 受領者を検索すべき
    throw new Error('receiverRequest is undefined')
  }

  if (receiv.status === RequestStatus.declined) {
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

  if (receiv.status === RequestStatus.approved) {
    if (req.status === RequestStatus.approved) {
      return InvoiceStatusFromUserView.approvedNextApproved
    }
    if (req.status === RequestStatus.awaiting) {
      return InvoiceStatusFromUserView.approvedAwaitingNextApproval
    }
    if (req.status === RequestStatus.declined) {
      console.error(
        'receiverRequest.status === .approved, but requesterRequest.status === .declined\n',
        'Should be (awaiting, rejected)\n',
        `${requestPair}`,
      )
    }
    return InvoiceStatusFromUserView.handling
  }

  if (receiv.status === RequestStatus.awaiting) {
    if (req.status !== RequestStatus.declined) {
      console.error(
        'receiverRequest.status === .awaiting but requesterRequest.status !== .decline',
        'Should be (awaiting, rejected)\n',
        `${requestPair}`,
      )
    }
    return InvoiceStatusFromUserView.handling
  }
  unreachable(receiv.status)
}
