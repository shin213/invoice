import { Table, Thead, Tr, Th, Tbody, Td, Tfoot, Button, Box } from '@chakra-ui/react'
import { MdOpenInNew } from 'react-icons/md'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { InvoiceStatus } from '../../generated/graphql'
import { INVOICE_STATUS } from '../../utils/i18n'
import dayjs from 'dayjs'

export type InvoicesTableLineProp = {
  __typename?: unknown
  id: string
  billingDate?: dayjs.Dayjs | null
  dueDateForPayment?: dayjs.Dayjs | null
  paymentAmount?: number | null
  status: InvoiceStatus
  construction?: {
    __typename?: unknown
    id: number
    name: string
  } | null
  companyId: number
}

export type InvoicesTableProps = {
  invoices: InvoicesTableLineProp[]
}

const InvoicesTableLine = (invoice: InvoicesTableLineProp) => {
  const navigate = useNavigate()
  const detailURL = `/invoices/${invoice.id}`
  const constructionName = invoice.construction ? invoice.construction.name : '-'

  return (
    <Tr key={invoice.id}>
      {/* <Td>{invoice.company.name}</Td> */}
      <Td>{constructionName}</Td>
      <Td>{invoice.billingDate}</Td>
      <Td>{invoice.dueDateForPayment}</Td>
      <Td isNumeric>{invoice.paymentAmount}</Td>
      <Td>{INVOICE_STATUS[invoice.status]}</Td>
      <Td>
        <Button bgColor="primary.500" color="white" onClick={() => navigate(detailURL)}>
          <MdOpenInNew title="確認" />
          <Box p="2">確認</Box>
        </Button>
      </Td>
    </Tr>
  )
}

const InvoicesTable: React.VFC<InvoicesTableProps> = ({ invoices }: InvoicesTableProps) => (
  <Table variant="striped">
    <Thead>
      <Tr>
        {/* <Th>企業名</Th> */}
        <Th>工事名</Th>
        <Th>請求日</Th>
        <Th>支払い期限</Th>
        <Th>支払い金額</Th>
        <Th>ステータス</Th>
        <Th>原本表示</Th>
      </Tr>
    </Thead>
    <Tbody>{invoices.map((invoice) => InvoicesTableLine(invoice))}</Tbody>
    <Tfoot>
      <Tr>
        {/* <Th>企業名</Th> */}
        <Th>工事名</Th>
        <Th>請求日</Th>
        <Th>支払い期限</Th>
        <Th>支払い金額</Th>
        <Th>ステータス</Th>
        <Th>原本表示</Th>
      </Tr>
    </Tfoot>
  </Table>
)

export default InvoicesTable
