import { Request, RequestStatus } from 'src/requests/request'
import {
  getInvoiceStatusFromUserView,
  InvoiceStatusFromUserView,
} from './invoice-status'

describe('getInvoiceStatusFromUserView', () => {
  function createDummyRequest(status: RequestStatus): Request {
    return {
      status,
    } as unknown as Request
  }
  async function check(
    receiverStatus: RequestStatus,
    requesterStatus: RequestStatus,
    expected: InvoiceStatusFromUserView,
  ) {
    const receiverRequest = createDummyRequest(receiverStatus)
    const requesterRequest = createDummyRequest(requesterStatus)
    const result = getInvoiceStatusFromUserView({
      receiverRequest,
      requesterRequest,
    })
    await expect(result).toEqual(expected)
  }

  it('should return declined if received (declined, declined)', async () => {
    await check(
      RequestStatus.declined,
      RequestStatus.declined,
      InvoiceStatusFromUserView.declined,
    )
  })
})
