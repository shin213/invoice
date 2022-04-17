import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { unreachable } from '../../utils'
import { InvoiceActionLog } from '../../utils/InvoiceActionLog'
import { fullName } from '../../utils/user'

type _Invoice = {
  company: {
    name: string
  }
}

type FlowCardProps = {
  flow: InvoiceActionLog
  invoice: _Invoice
}

const _FlowCard: React.VFC<FlowCardProps> = ({ flow, invoice }: FlowCardProps) => {
  let msg: string
  if (flow.type === 'send') {
    msg = `この請求書は${invoice.company.name}から送られてきました。`
    // } else if (flow.type === 'receive') {
    // TODO: 請求書を受領した時の文言
  } else if (flow.type === 'approve') {
    msg = `${fullName(flow.user)}がこの請求書を承認し、リクエストを送りました。`
  } else if (flow.type === 'decline') {
    msg = `${fullName(flow.user)}がこの請求書を却下しました。`
  } else if (flow.type === 'reapply') {
    msg = `${fullName(flow.user)}がこの請求書を再申請しました。`
  } else if (flow.type === 'complete') {
    msg = `${fullName(flow.user)}がこの請求書をしました。`
  } else {
    unreachable(flow)
  }
  return (
    // <Card>
    <Flex align="center" justify="space-between">
      <Box>{flow.date.toISOString()}</Box>
      <Box>{msg}</Box>
    </Flex>
    // </Card>
  )
}

const FlowCard = React.memo(_FlowCard)

export type InvoiceActionLogsViewProps = {
  readonly flows: InvoiceActionLog[]
  readonly invoice: _Invoice
}

const _InvoiceActionLogsView: React.VFC<InvoiceActionLogsViewProps> = ({
  flows,
  invoice,
}: InvoiceActionLogsViewProps) => {
  return (
    <Flex>
      {flows.map((flow, index) => (
        <FlowCard flow={flow} invoice={invoice} key={index} />
      ))}
    </Flex>
  )
}

const InvoiceActionLogsView = React.memo(_InvoiceActionLogsView)

export default InvoiceActionLogsView
