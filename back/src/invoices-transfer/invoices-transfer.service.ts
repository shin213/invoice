import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Request, RequestStatus } from 'src/requests/request'
import {
  InvoiceStatusFromUserView,
  RequestPair,
} from 'src/common/invoice-status'
import { Invoice, InvoiceStatus } from 'src/invoices/invoice'
import { InvoicesService } from 'src/invoices/invoices.service'
import { RequestsService } from 'src/requests/requests.service'
import { unreachable } from 'src/utils'

@Injectable()
export class InvoicesTransferService {
  constructor(
    private invoicesService: InvoicesService,
    private requestsService: RequestsService,
  ) {}

  private checkInvoice(invoice: Invoice, companyId: number): void {
    if (invoice.companyId !== companyId) {
      throw new HttpException(
        'Invoice does not belong to this company',
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  private async requestPair(
    requests: Request[],
    userId: string,
  ): Promise<RequestPair> {
    const requesterReqs = requests.filter(
      (request) => request.requesterId === userId,
    )
    if (requesterReqs.length > 1) {
      console.error(`requesterReqs.length > 1 ${requesterReqs}`)
    }
    const requesterRequest = requesterReqs[0]
    if (requesterRequest != undefined) {
      const n = requests.findIndex((request) => request.requesterId === userId)
      if (n <= 0) {
        // TODO: 初めのRequestについての挙動を考察
        throw new HttpException(
          'Receiver Request Not Found',
          HttpStatus.NOT_FOUND,
        )
      }
      const receiverRequest = requests[n - 1]
      const receivers = await receiverRequest?.receivers
      if (
        receiverRequest == undefined ||
        receivers?.find((receiver) => receiver.id === userId) == undefined
      ) {
        throw new HttpException(
          'You are not a receiver of this request',
          HttpStatus.BAD_REQUEST,
        )
      }
      return {
        requesterRequest,
        receiverRequest,
      }
    }

    const receivers = await Promise.all(
      requests.map((request) => request.receivers),
    )

    const receiverReqs = requests.filter(
      (_, i) =>
        receivers[i]?.find((receiver) => receiver.id === userId) != undefined,
    )
    if (receiverReqs.length > 1) {
      console.error(`receiverReqs.length > 1 ${receiverReqs}`)
    }

    const receiverRequest = receiverReqs[0]
    if (receiverRequest == undefined) {
      throw new HttpException(
        'You are not a receiver of this request',
        HttpStatus.BAD_REQUEST,
      )
    }
    return {
      receiverRequest,
      requesterRequest: undefined,
    }
  }

  _getInvoiceStatusFromUserView(
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

  async getInvoiceStatusFromUserView(
    userId: string,
    companyId: number,
    invoiceId: string,
  ): Promise<InvoiceStatusFromUserView> {
    const invoice = await this.invoicesService.findOneById(invoiceId)
    if (invoice == undefined) {
      throw new HttpException('Invoice Not Found', HttpStatus.NOT_FOUND)
    }
    this.checkInvoice(invoice, companyId)

    if (invoice.status === InvoiceStatus.completelyApproved) {
      return InvoiceStatusFromUserView.completelyApproved
    }

    const requests = await this.requestsService.findByInvoiceId(invoiceId)

    const requestPair = await this.requestPair(requests, userId)
    return this._getInvoiceStatusFromUserView(requestPair)
  }
  // async receive() {}
  // async approve() {}
}
