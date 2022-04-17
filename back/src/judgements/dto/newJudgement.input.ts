import { JudgementType } from '../judgement'

export type NewJudgementInput = {
  userId: string
  requestId: number
  type: JudgementType
}
