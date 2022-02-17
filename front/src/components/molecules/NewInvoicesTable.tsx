import { Table, Thead, Tr, Th, Tbody, Td, Button, Box } from '@chakra-ui/react'
import { MdEdit } from 'react-icons/md'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export type NewInvoicesTableProps = {
  issues: {
    companyName: string
    constructionName?: string
    createdAt?: string
    payment?: string
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
          <Th>作成日</Th>
          <Th>請求金額</Th>
          <Th>編集</Th>
        </Tr>
      </Thead>
      <Tbody>
        {issues.map((issue) => (
          <Tr key={issue.invoiceLogId}>
            <Td>{issue.companyName}</Td>
            <Td>{issue.constructionName}</Td>
            <Td>{issue.createdAt}</Td>
            <Td>{issue.payment}</Td>
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
