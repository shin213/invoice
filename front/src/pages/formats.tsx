import { Box, Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import InvoiceFormatsTable, {
  InvoiceFormatsTableProps,
} from '../components/molecules/InvoiceFormatsTable'
import LoginTemplate from '../components/templates/LoginTemplate'
import { InvoiceFormatLogsQuery, useInvoiceFormatLogsQuery } from '../generated/graphql'

function toInvoiceFormatsTableProps(data: InvoiceFormatLogsQuery): InvoiceFormatsTableProps {
  const formats = data.invoiceFormatLogs.map((formatLog) => ({
    companyName: formatLog.invoiceFormat.company.name,
    formatsName: formatLog.invoiceFormat.name,
    invoiceFormatsLogId: formatLog.id,
  }))
  return { formats }
}

const InvoiceFormatsPage: React.VFC = () => {
  const { loading, error, data } = useInvoiceFormatLogsQuery()
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
      <Stack>
        <Heading as="h1" size="md" textAlign="center">
          請求書ひな型
        </Heading>
        <Box bg="white" p={4} borderRadius="md" shadow="md">
          {data && <InvoiceFormatsTable formats={toInvoiceFormatsTableProps(data).formats} />}
        </Box>
      </Stack>
    </LoginTemplate>
  )
}

export default InvoiceFormatsPage
