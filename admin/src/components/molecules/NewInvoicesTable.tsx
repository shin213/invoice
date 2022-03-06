import { Table, Thead, Tr, Th, Tbody, Td, Button, Box } from '@chakra-ui/react'
import { MdEdit } from 'react-icons/md'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export type NewInvoicesTableProps = {
  issues: {
    companyName: string
    constructionName?: string
    billingDate?: string
    paymentDeadline?: string
    paymentAmount?: number
    invoiceLogId: string
  }[]
}

const NewInvoicesTable: React.VFC<NewInvoicesTableProps> = ({ issues }: NewInvoicesTableProps) => {
  const navigate = useNavigate()
  return (
    <Table variant="striped">
      <Thead>
        <Tr>
          <Th>企業名</Th>
          <Th>工事名</Th>
          <Th>請求日</Th>
          <Th>支払期限</Th>
          <Th>支払金額</Th>
          <Th>ステータス</Th>
          <Th>原本表示</Th>
        </Tr>
      </Thead>
      <Tbody>
        {issues.map((issue) => (
          <Tr key={issue.invoiceLogId}>
            <Td>{issue.companyName}</Td>
            <Td>{issue.constructionName}</Td>
            <Td>{issue.billingDate}</Td>
            <Td>{issue.paymentDeadline}</Td>
            <Td>{issue.paymentAmount ? issue.paymentAmount.toLocaleString() : ''}</Td>
            <Td></Td>
            <Td>
              <Button
                bgColor="cyan.500"
                color="white"
                onClick={() => navigate(`/issue/${issue.invoiceLogId}`)}
              >
                <MdEdit title="編集" />
                <Box p="2">編集</Box>
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default NewInvoicesTable
