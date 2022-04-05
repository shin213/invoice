/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Request, RequestStatus } from 'src/requests/request'
import { unreachable } from 'src/utils'

export type RequestPair = {
  // 自分がReceiverのRequest
  receiverRequest?: Request
  // 自分がRequesterのRequest
  requesterRequest?: Request
}
@ObjectType()
export class RequestPairStatus {
  @Field((type) => Request, { nullable: true })
  receiverRequest?: Request
  @Field((type) => Request, { nullable: true })
  requesterRequest?: Request

  // GraphQL としてフィールドが存在するときにはnullでないが、プログラム上で扱うときにはundefinableにしたい問題で?をつけている
  @Field((type) => InvoiceStatusFromUserView)
  invoiceStatusFromUserView?: InvoiceStatusFromUserView
}

export enum InvoiceStatusFromUserView {
  // (自分がReceiverのRequest, 自分がRequesterのRequest)
  // (declined, any)
  declined = 'declined',

  // (awaiting | approved, not exists)
  // should be (awaiting, not exists)
  approving = 'approving',

  // (approved | undefined, awaiting)
  approvedAwaitingNextApproval = 'approvedAwaitingNextApproval',

  // (approved | undefined, approved)
  approvedNextApproved = 'approvedNextApproved',

  // (undefined, any except awaiting and approved)
  unrelated = 'unrelated',

  // any other except completely approved
  // should be (awaiting, declined)
  handling = 'handling',

  // completely approved
  completelyApproved = 'completelyApproved',
}

registerEnumType(InvoiceStatusFromUserView, {
  name: 'InvoiceStatusFromUserView',
  description: 'ユーザー視点での承認の状態',
  valuesMap: {
    declined: {
      description: '自分が申請者で差し戻され要対応な状態',
    },
    approving: { description: '承認担当中・未承認' },
    approvedAwaitingNextApproval: {
      description: '受領or承認済み・次の承認待ち',
    },
    approvedNextApproved: { description: '受領or承認済み・次の承認も済み' },
    unrelated: { description: '主たる関係がない' },
    handling: { description: '自分が差し戻した後の対応待ち' },
    completelyApproved: { description: '全員に承認された' },
  },
})

// getInvoiceStatusFromUserView does not check if the invoice is completely approved.
export function getInvoiceStatusFromUserView(
  requestPair: RequestPair,
): InvoiceStatusFromUserView {
  const { receiverRequest: receiv, requesterRequest: req } = requestPair

  if (receiv == undefined) {
    if (req?.status === RequestStatus.awaiting) {
      return InvoiceStatusFromUserView.approvedAwaitingNextApproval
    }
    if (req?.status === RequestStatus.approved) {
      return InvoiceStatusFromUserView.approvedNextApproved
    }
    if (req != undefined) {
      console.error('receiv == undefined && req != undefined: req: ', req)
    }
    return InvoiceStatusFromUserView.unrelated
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
