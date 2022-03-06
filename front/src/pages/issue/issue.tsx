import { Box, Button, Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import { MdAddCircleOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import NewInvoicesTable, {
  NewInvoicesTableProps,
} from '../../components/molecules/NewInvoicesTable'
import LoginTemplate from '../../components/templates/LoginTemplate'
import { IssuesQuery, useIssuesQuery } from '../../generated/graphql'

function toNewInvoicesTableProps(data: IssuesQuery): NewInvoicesTableProps {
  const issues = data.invoiceLogs.map((invoiceLog) => {
    const { id: logId, body, invoiceFormatLog: fmtLog } = invoiceLog
    const vals = Object.fromEntries(body.map((element) => [element.elementId, element.value]))
    const issue = {
      companyName: fmtLog.invoiceFormat.company.name,
      constructionName: fmtLog.constructionNameId ? vals[fmtLog.constructionNameId] : undefined,
      billingDate: fmtLog.billingDateId ? vals[fmtLog.billingDateId] : undefined, // TODO: DateTimeへの対応
      paymentDeadline: fmtLog.paymentDeadlineId ? vals[fmtLog.paymentDeadlineId] : undefined,
      paymentAmount: fmtLog.paymentAmountId ? Number(vals[fmtLog.paymentAmountId]) : undefined,
      invoiceLogId: logId,
    }
    return issue
  })
  return { issues }
}

const IssueListPage: React.VFC = () => {
  const navigate = useNavigate()

  const { loading, error, data } = useIssuesQuery()
  if (loading || error || !data) {
    if (error) {
      console.error(error)
    }
    return (
      <LoginTemplate>
        <Heading as="h1" size="md" textAlign="center">
          申請
        </Heading>
      </LoginTemplate>
    )
  }
  return (
    <LoginTemplate>
      <Button bgColor="cyan.500" color="white" onClick={() => navigate('../formats')}>
        <MdAddCircleOutline title="新規作成" />
        <Box p="2">新規作成</Box>
      </Button>
      <Stack>
        <Heading as="h1" size="md" textAlign="center">
          下書き
        </Heading>
        <Box bg="white" p={4} borderRadius="md" shadow="md">
          {data && <NewInvoicesTable issues={toNewInvoicesTableProps(data).issues} />}
        </Box>
      </Stack>
    </LoginTemplate>
  )
}

export default IssueListPage
