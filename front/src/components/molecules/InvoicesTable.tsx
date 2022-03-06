import { Table, Thead, Tr, Th, Tbody, Td, Tfoot, Button, Box } from '@chakra-ui/react'
import { MdOpenInNew } from 'react-icons/md'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export type InvoicesTableLineProp = {
  __typename?: unknown
  id: number
  companyName: string
  constructionName: string
  billingDate: string
  dueDate: string
  payment: string
  status: string
}

export type InvoicesTableProps = {
  invoices: InvoicesTableLineProp[]
}

const InvoicesTable: React.VFC<InvoicesTableProps> = ({ invoices }: InvoicesTableProps) => {
  const navigate = useNavigate()
  return (
    <Table variant="striped">
      <Thead>
        <Tr>
          <Th>企業名</Th>
          <Th>工事名</Th>
          <Th>請求日</Th>
          <Th>支払い期限</Th>
          <Th>支払い金額</Th>
          <Th>ステータス</Th>
          <Th>原本表示</Th>
        </Tr>
      </Thead>
      <Tbody>
        {invoices.map((invoice) => (
          <Tr key={invoice.id}>
            <Td>{invoice.companyName}</Td>
            <Td>{invoice.constructionName}</Td>
            <Td>{invoice.billingDate}</Td>
            <Td>{invoice.dueDate}</Td>
            <Td isNumeric>{invoice.payment}</Td>
            <Td>{invoice.status}</Td>
            <Td>
              <Button bgColor="cyan.500" color="white" onClick={() => navigate(`/invoices/${invoice.id}`)}>
                <MdOpenInNew title="確認" />
                <Box p="2">確認</Box>
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
      <Tfoot>
        <Tr>
          <Th>企業名</Th>
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
}

export default InvoicesTable
