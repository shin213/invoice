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
import { ApproveRequestInput } from './dto/approveRequest.input'
import { User } from 'src/users/user'
import { SendInvoiceInput } from './dto/sendInvoice.input'
import { CommentsService } from 'src/comments/comments.service'
import { DeclineRequestInput } from './dto/declineRequest.input'
import { ReapplyRequestInput } from './dto/reapplyRequest.input'
import { CompleteInvoiceInput } from './dto/completeInvoice.input'
import { ReceiveInvoiceInput } from './dto/receiveInvoice.input'

@Injectable()
export class InvoicesTransferService {
  constructor(
    private invoicesService: InvoicesService,
    private requestsService: RequestsService,
    private commentsService: CommentsService,
  ) {}

  private checkInvoice(invoice: Invoice, companyId: number): void {
    if (invoice.companyId !== companyId) {
      throw new HttpException(
        'Invoice does not belong to this company',
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  private async _requestPair(
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
      if (n < 0) {
        // TODO: 初めのRequestについての挙動を考察
        throw new HttpException(
          'Receiver Request Not Found',
          HttpStatus.NOT_FOUND,
        )
      }
      if (n === 0) {
        return {
          requesterRequest,
          receiverRequest: undefined,
        }
      }
      const receiverRequest = requests[n - 1]
      const receivers =
        receiverRequest == undefined
          ? undefined
          : await this.requestsService.receivers(receiverRequest)
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
      requests.map((request) => this.requestsService.receivers(request)),
    )

    const receiverReqs = requests.filter(
      (_, i) =>
        receivers[i]?.find((receiver) => receiver.id === userId) != undefined,
    )
    if (receiverReqs.length > 1) {
      console.error(`receiverReqs.length > 1 ${receiverReqs}`)
    }

    const receiverRequest = receiverReqs[0]
    return {
      receiverRequest,
      requesterRequest: undefined,
    }
  }

  async getRequestPair(user: User, invoiceId: string): Promise<RequestPair> {
    const invoice = await this.invoicesService.findOneById(invoiceId)
    if (invoice == undefined) {
      throw new HttpException('Invoice Not Found', HttpStatus.NOT_FOUND)
    }
    return await this.requestPair(user, invoice)
  }

  async requestPair(user: User, invoice: Invoice): Promise<RequestPair> {
    this.checkInvoice(invoice, user.companyId)
    const requests = await this.requestsService.findByInvoiceId(invoice.id)

    const requestPair = await this._requestPair(requests, user.id)
    return requestPair
  }

  getInvoiceStatusFromUserView(
    requestPair: RequestPair,
  ): InvoiceStatusFromUserView {
    return getInvoiceStatusFromUserView(requestPair)
  }

  async send(
    currentUser: User,
    receiveInput: SendInvoiceInput,
  ): Promise<Invoice> {
    const { invoiceId, comment } = receiveInput
    const invoice = await this.invoicesService.findOneById(invoiceId)
    if (invoice == undefined) {
      throw new HttpException('Invoice Not Found', HttpStatus.NOT_FOUND)
    }

    if (invoice.status !== InvoiceStatus.inputtingWithSystem) {
      throw new HttpException(
        'Invoice status is not inputtingWithSystem',
        HttpStatus.BAD_REQUEST,
      )
    }

    // const requests = await this.requestsService.findByInvoiceId(invoiceId)
    // if (requests.length !== 0) {
    //   console.error('Already made a request', requests)
    //   throw new HttpException('Already made a request', HttpStatus.BAD_REQUEST)
    // }

    this.commentsService.create({
      content: comment,
      invoiceId,
      userId: currentUser.id,
      requestId: undefined,
    })

    const updated = await this.invoicesService.updateStatusLock(invoiceId)
    return updated
  }

  async receive(
    currentUser: User,
    receiveInput: ReceiveInvoiceInput,
  ): Promise<Invoice> {
    const { invoiceId, nextReceiverIds, comment } = receiveInput
    const invoice = await this.invoicesService.findOneById(invoiceId)
    if (invoice == undefined) {
      throw new HttpException('Invoice Not Found', HttpStatus.NOT_FOUND)
    }

    if (invoice.status !== InvoiceStatus.awaitingReceipt) {
      throw new HttpException(
        'Invoice status is not awaitingReceipt',
        HttpStatus.BAD_REQUEST,
      )
    }

    // const requests = await this.requestsService.findByInvoiceId(invoiceId)
    // if (requests.length !== 0) {
    //   console.error('Already made a request', requests)
    //   throw new HttpException('Already made a request', HttpStatus.BAD_REQUEST)
    // }

    const updated = await this.invoicesService.updateStatus(
      invoiceId,
      InvoiceStatus.underApproval,
    )
    try {
      await this.requestsService.create({
        requesterId: currentUser.id,
        invoiceId,
        requestReceiverIds: nextReceiverIds,
        comment, // これは作成時のコメント（区別する必要がない）
      })
    } catch (e) {
      console.error(e)
      await this.invoicesService.updateStatus(
        invoiceId,
        InvoiceStatus.awaitingReceipt,
      )
      throw e
    }
    this.commentsService.create({
      content: comment,
      invoiceId,
      userId: currentUser.id,
      requestId: undefined,
    })
    return updated
  }

  async approve(
    currentUser: User,
    approveInput: ApproveRequestInput,
  ): Promise<Request> {
    const { requestId, receiverIds, comment } = approveInput
    const request = await this.requestsService.findOneById(requestId)
    if (request == undefined) {
      throw new HttpException('Request Not Found', HttpStatus.NOT_FOUND)
    }
    const invoice = await this.invoicesService.findOneById(request.invoiceId)
    if (invoice == undefined) {
      throw new HttpException('Invoice Not Found', HttpStatus.NOT_FOUND)
    }
    this.checkInvoice(invoice, currentUser.companyId)
    if (invoice.status !== InvoiceStatus.underApproval) {
      throw new HttpException(
        'Invoice status is not underApproval',
        HttpStatus.BAD_REQUEST,
      )
    }

    const requests = await this.requestsService.findByInvoiceId(
      request.invoiceId,
    )

    const requestPair = await this._requestPair(requests, currentUser.id)

    if (request.id !== requestPair.receiverRequest?.id) {
      throw new HttpException(
        'The status of this request is not correct: duplicated users of requests',
        HttpStatus.BAD_REQUEST,
      )
    }

    if (request.status !== RequestStatus.awaiting) {
      throw new HttpException(
        'Received Request is not awaiting',
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
      const newRequest = await this.requestsService.create({
        requesterId: currentUser.id,
        invoiceId: request.invoiceId,
        requestReceiverIds: receiverIds,
        comment, // これは作成時のコメント（区別する必要がない）
      })
      return newRequest
    } catch (e) {
      console.error(e)
      await this.requestsService.updateStatus(
        request.id,
        RequestStatus.awaiting,
      )
      throw e
    }
  }

  async decline(
    currentUser: User,
    declineInput: DeclineRequestInput,
  ): Promise<boolean> {
    const { requestId, comment } = declineInput
    const request = await this.requestsService.findOneById(requestId)
    if (request == undefined) {
      throw new HttpException('Request Not Found', HttpStatus.NOT_FOUND)
    }
    const invoice = await this.invoicesService.findOneById(request.invoiceId)
    if (invoice == undefined) {
      throw new HttpException('Invoice Not Found', HttpStatus.NOT_FOUND)
    }
    this.checkInvoice(invoice, currentUser.companyId)

    if (invoice.status !== InvoiceStatus.underApproval) {
      throw new HttpException(
        'Invoice status is not underApproval',
        HttpStatus.BAD_REQUEST,
      )
    }

    const requests = await this.requestsService.findByInvoiceId(
      request.invoiceId,
    )

    const requestPair = await this._requestPair(requests, currentUser.id)

    if (request.id !== requestPair.receiverRequest?.id) {
      throw new HttpException(
        'The status of this request is not correct: duplicated users of requests',
        HttpStatus.BAD_REQUEST,
      )
    }

    // Approved, Declined であっても decline 可能にする
    // if (request.status !== RequestStatus.awaiting) {
    //   throw new HttpException(
    //     'Received Request is not awaiting',
    //     HttpStatus.BAD_REQUEST,
    //   )
    // }

    await this.requestsService.updateStatus(requestId, RequestStatus.declined)
    try {
      if (requestPair.receiverRequest != undefined) {
        await this.requestsService.updateStatus(
          requestPair.receiverRequest.id,
          RequestStatus.awaiting,
        )
      } else {
        await this.invoicesService.updateStatus(
          invoice.id,
          InvoiceStatus.declinedToSystem, // TODO: check if system or file
        )
      }
    } catch (e) {
      console.error(e)
      // 元に戻す
      await this.requestsService.updateStatus(requestId, request.status)
      throw e
    }

    this.commentsService.create({
      content: comment,
      invoiceId: invoice.id,
      userId: currentUser.id,
      requestId,
    })
    return true
  }

  async reapply(
    currentUser: User,
    reapplyInput: ReapplyRequestInput,
  ): Promise<boolean> {
    const { requestId, comment } = reapplyInput
    const request = await this.requestsService.findOneById(requestId)
    if (request == undefined) {
      throw new HttpException('Request Not Found', HttpStatus.NOT_FOUND)
    }
    const invoice = await this.invoicesService.findOneById(request.invoiceId)
    if (invoice == undefined) {
      throw new HttpException('Invoice Not Found', HttpStatus.NOT_FOUND)
    }
    this.checkInvoice(invoice, currentUser.companyId)

    if (invoice.status !== InvoiceStatus.underApproval) {
      throw new HttpException(
        'Invoice status is not underApproval',
        HttpStatus.BAD_REQUEST,
      )
    }

    const requests = await this.requestsService.findByInvoiceId(
      request.invoiceId,
    )

    const requestPair = await this._requestPair(requests, currentUser.id)

    if (request.id !== requestPair.requesterRequest?.id) {
      throw new HttpException(
        'The status of this request is not correct: duplicated users of requests',
        HttpStatus.BAD_REQUEST,
      )
    }

    if (request.status !== RequestStatus.declined) {
      throw new HttpException(
        'Received Request is not declined',
        HttpStatus.BAD_REQUEST,
      )
    }

    await this.requestsService.updateStatus(requestId, RequestStatus.awaiting)
    try {
      this.commentsService.create({
        content: comment,
        invoiceId: invoice.id,
        userId: currentUser.id,
        requestId,
      })
    } catch (e) {
      console.error(e)
      // 元に戻す
      await this.requestsService.updateStatus(requestId, request.status)
      throw e
    }
    return true
  }

  async complete(
    currentUser: User,
    input: CompleteInvoiceInput,
  ): Promise<Invoice> {
    const { requestId } = input
    const request = await this.requestsService.findOneById(requestId)
    if (request == undefined) {
      throw new HttpException('Request Not Found', HttpStatus.NOT_FOUND)
    }
    const invoice = await this.invoicesService.findOneById(request.invoiceId)
    if (invoice == undefined) {
      throw new HttpException('Invoice Not Found', HttpStatus.NOT_FOUND)
    }
    this.checkInvoice(invoice, currentUser.companyId)
    if (invoice.status !== InvoiceStatus.underApproval) {
      throw new HttpException(
        'Invoice status is not underApproval',
        HttpStatus.BAD_REQUEST,
      )
    }

    const requests = await this.requestsService.findByInvoiceId(
      request.invoiceId,
    )

    const requestPair = await this._requestPair(requests, currentUser.id)

    if (request.id !== requestPair.receiverRequest?.id) {
      throw new HttpException(
        'The status of this request is not correct: duplicated users of requests',
        HttpStatus.BAD_REQUEST,
      )
    }

    if (request.status !== RequestStatus.awaiting) {
      throw new HttpException(
        'Received Request is not awaiting',
        HttpStatus.BAD_REQUEST,
      )
    }

    await this.requestsService.updateStatus(request.id, RequestStatus.approved)
    try {
      const updated = await this.invoicesService.complete(invoice.id)
      return updated
    } catch (e) {
      console.error(e)
      await this.requestsService.updateStatus(
        request.id,
        RequestStatus.approved,
      )
      throw e
    }
  }

  // TODO: handle の一貫で再作成を行う
}
