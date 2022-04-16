import { Dayjs } from 'dayjs'
import { JudgementType } from '../generated/graphql'

type _User = {
  id: string
  familyName: string
  givenName: string
  email: string
}

type _Judgement = {
  createdAt: Dayjs
  id: number
  type: JudgementType
  user: _User
}

export type InvoiceActionLog =
  | SendActionLog
  | ApproveActionLog
  | DeclineActionLog
  | ReapplyActionLog
  | CompleteActionLog
export type SendActionLog = {
  type: 'send'
  date: Dayjs
}
export type ApproveActionLog = {
  type: 'approve'
  date: Dayjs
  user: _User
}
export type DeclineActionLog = {
  type: 'decline'
  date: Dayjs
  user: _User
}
export type ReapplyActionLog = {
  type: 'reapply'
  date: Dayjs
  user: _User
}
export type CompleteActionLog = {
  type: 'complete'
  date: Dayjs
  user: _User
}

export function convertToActionLogs(
  judgements: _Judgement[],
  invoice: { createdAt: Dayjs },
): InvoiceActionLog[] {
  return [
    {
      type: 'send',
      date: invoice.createdAt,
    },
    ...judgements.map((judgement) => ({
      type: judgement.type,
      date: judgement.createdAt,
      user: judgement.user,
    })),
  ]
}

export type ActionLogType = InvoiceActionLog['type']
