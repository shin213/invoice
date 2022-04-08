import { Request, RequestStatus } from 'src/requests/request'
import {
  getInvoiceStatusFromUserView,
  InvoiceStatusFromUserView,
} from './invoice-status'

describe('getInvoiceStatusFromUserView', () => {
  const checked: [RequestStatus | undefined, RequestStatus | undefined][] = []

  function createDummyRequest(status: RequestStatus): Request {
    // テストで用いるのは { status } だけなので強制型変換
    return {
      status,
    } as unknown as Request
  }

  async function check(
    receiverStatus: RequestStatus | undefined,
    requesterStatus: RequestStatus | undefined,
    expected: InvoiceStatusFromUserView,
  ) {
    const receiverRequest =
      receiverStatus == undefined
        ? undefined
        : createDummyRequest(receiverStatus)
    const requesterRequest =
      requesterStatus == undefined
        ? undefined
        : createDummyRequest(requesterStatus)
    const result = getInvoiceStatusFromUserView({
      receiverRequest,
      requesterRequest,
    })
    await expect(result).toEqual(expected)
  }

  for (const requesterStatus of [
    RequestStatus.declined,
    RequestStatus.approved,
    RequestStatus.awaiting,
    undefined,
  ]) {
    checked.push([RequestStatus.declined, requesterStatus])
    it(`should return declined if received (declined, ${requesterStatus})`, async () => {
      await check(
        RequestStatus.declined,
        requesterStatus,
        InvoiceStatusFromUserView.declined,
      )
    })
  }

  for (const receiverStatus of [
    RequestStatus.awaiting,
    RequestStatus.approved,
  ]) {
    checked.push([receiverStatus, undefined])
    it(`should return approving if received (${receiverStatus}, not exists)`, async () => {
      await check(
        receiverStatus,
        undefined,
        InvoiceStatusFromUserView.approving,
      )
    })
  }

  checked.push([RequestStatus.approved, RequestStatus.awaiting])
  it('should return approvedAwaitingNextApproval if received (approved, awaiting)', async () => {
    await check(
      RequestStatus.approved,
      RequestStatus.awaiting,
      InvoiceStatusFromUserView.approvedAwaitingNextApproval,
    )
  })

  checked.push([undefined, RequestStatus.awaiting])
  it('should return approvedAwaitingNextApproval if received (undefined, awaiting)', async () => {
    await check(
      undefined,
      RequestStatus.awaiting,
      InvoiceStatusFromUserView.approvedAwaitingNextApproval,
    )
  })

  checked.push([RequestStatus.approved, RequestStatus.approved])
  it('should return approvedNextApproved if received (approved, approved)', async () => {
    await check(
      RequestStatus.approved,
      RequestStatus.approved,
      InvoiceStatusFromUserView.approvedNextApproved,
    )
  })

  checked.push([undefined, RequestStatus.approved])
  it('should return approvedNextApproved if received (undefined, approved)', async () => {
    await check(
      undefined,
      RequestStatus.approved,
      InvoiceStatusFromUserView.approvedNextApproved,
    )
  })

  for (const requesterStatus of [RequestStatus.declined, undefined]) {
    checked.push([undefined, requesterStatus])
    it(`should return unrelated if received (${undefined}, ${requesterStatus})`, async () => {
      await check(
        undefined,
        requesterStatus,
        InvoiceStatusFromUserView.unrelated,
      )
    })
  }

  for (const receiverStatus of [
    RequestStatus.approved,
    RequestStatus.awaiting,
    RequestStatus.approved,
    undefined,
  ]) {
    for (const requesterStatus of [
      RequestStatus.awaiting,
      RequestStatus.approved,
      RequestStatus.declined,
      undefined,
    ]) {
      if (
        checked.find(
          (x) => x[0] === receiverStatus && x[1] === requesterStatus,
        ) !== undefined
      ) {
        // skip if already checked
        continue
      }
      checked.push([receiverStatus, requesterStatus])
      it(`should return handling if received (${receiverStatus}, ${requesterStatus})`, async () => {
        await check(
          receiverStatus,
          requesterStatus,
          InvoiceStatusFromUserView.handling,
        )
      })
    }
  }
  it('should check all patterns', async () => {
    await expect(checked.length).toEqual(16)
  })
})
