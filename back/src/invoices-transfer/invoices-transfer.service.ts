import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Request, RequestStatus } from 'src/requests/request'
import {
  getInvoiceStatusFromUserView,
  InvoiceStatusFromUserView,
  RequestPair,
} from 'src/common/invoice-status'
import { Invoice, InvoiceStatus } from 'src/invoices/invoice'
import { InvoicesService } from 'src/invoices/invoices.service'
import { RequestsService } from 'src/requests/requests.service'
import { ApproveInvoiceInput } from './dto/approveInvoice.input'
import { User } from 'src/users/user'
import { ReceiveInvoiceInput } from './dto/receiveInvoice.input'

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

  async getInvoiceStatusFromUserView(
    user: User,
    invoiceId: string,
  ): Promise<InvoiceStatusFromUserView> {
    const invoice = await this.invoicesService.findOneById(invoiceId)
    if (invoice == undefined) {
      throw new HttpException('Invoice Not Found', HttpStatus.NOT_FOUND)
    }
    this.checkInvoice(invoice, user.companyId)

    if (invoice.status === InvoiceStatus.completelyApproved) {
      return InvoiceStatusFromUserView.completelyApproved
    }

    const requests = await this.requestsService.findByInvoiceId(invoiceId)

    const requestPair = await this.requestPair(requests, user.id)
    return getInvoiceStatusFromUserView(requestPair)
  }

  async receive(receiveInput: ReceiveInvoiceInput, currentUser: User) {
    const { invoiceId } = receiveInput
    const invoice = await this.invoicesService.findOneById(invoiceId)
    if (invoice == undefined) {
      throw new HttpException('Invoice Not Found', HttpStatus.NOT_FOUND)
    }
    this.checkInvoice(invoice, currentUser.companyId)

    if (invoice.status !== InvoiceStatus.inputtingWithSystem) {
      throw new HttpException(
        'Invoice status is not inputtingWithSystem',
        HttpStatus.BAD_REQUEST,
      )
    }

    const requests = await this.requestsService.findByInvoiceId(invoiceId)
    if (requests.length !== 0) {
      console.error('Already made a request', requests)
      throw new HttpException('Already made a request', HttpStatus.BAD_REQUEST)
    }

    await this.invoicesService.updateStatusLock(
      invoiceId,
      InvoiceStatus.awaitingReceipt,
    )
  }

  async approve(approveInput: ApproveInvoiceInput, currentUser: User) {
    const { invoiceId, requestId, receiverIds, comment } = approveInput
    const invoice = await this.invoicesService.findOneById(invoiceId)
    if (invoice == undefined) {
      throw new HttpException('Invoice Not Found', HttpStatus.NOT_FOUND)
    }
    this.checkInvoice(invoice, currentUser.companyId)

    const request = await this.requestsService.findOneById(requestId)
    if (request == undefined) {
      throw new HttpException('Request Not Found', HttpStatus.NOT_FOUND)
    }

    const requests = await this.requestsService.findByInvoiceId(invoiceId)

    const requestPair = await this.requestPair(requests, currentUser.id)

    if (request?.id !== requestPair.receiverRequest.id) {
      throw new HttpException(
        'The status of this request is not correct',
        HttpStatus.BAD_REQUEST,
      )
    }

    if (request.status !== RequestStatus.awaiting) {
      throw new HttpException(
        'Received Request is not awaiting',
        HttpStatus.BAD_REQUEST,
      )
    }
    if (requestPair.requesterRequest != undefined) {
      throw new HttpException(
        'You are not a receiver of this request',
        HttpStatus.BAD_REQUEST,
      )
    }

    const requesterIds = new Set(requests.map((req) => req.requesterId))

    for (const receiverId of receiverIds) {
      if (requesterIds.has(receiverId)) {
        throw new HttpException(
          'ReceiverIds include previouds requesters',
          HttpStatus.BAD_REQUEST,
        )
      }
      if (receiverId === currentUser.id) {
        throw new HttpException(
          'You cannot approve your own request',
          HttpStatus.BAD_REQUEST,
        )
      }
    }

    await this.requestsService.updateStatus(request.id, RequestStatus.approved)
    try {
      await this.requestsService.create({
        requesterId: currentUser.id,
        invoiceId,
        requestReceiverIds: receiverIds,
        comment,
      })
    } catch (e) {
      console.error(e)
      await this.requestsService.updateStatus(
        request.id,
        RequestStatus.awaiting,
      )
      throw e
    }
  }
}
