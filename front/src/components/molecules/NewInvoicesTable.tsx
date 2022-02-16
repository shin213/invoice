import { Table, Thead, Tr, Th, Tbody, Td, Button, Box } from '@chakra-ui/react'
import { MdEdit } from 'react-icons/md'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const data = [
  {
    companyName: 'ツバキ建設株式会社',
    constructionName: 'ツバキビル新築工事',
    billingDate: '2021/2/3',
    dueDate: '2021/2/28',
    payment: '41,494',
    invoiceLogId: 'fd4aebf6-559f-4a21-b655-b5483a9a0fab',
  },
  {
    companyName: 'サクラ建設株式会社',
    constructionName: 'サクラビル新築工事',
    billingDate: '',
    dueDate: '',
    payment: '',
    invoiceLogId: 'dummy',
  },
]

const NewInvoicesTable: React.VFC = () => {
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
        {data.map((invoice) => (
          <Tr key={invoice.constructionName}>
            <Td>{invoice.companyName}</Td>
            <Td>{invoice.constructionName}</Td>
            <Td>{invoice.dueDate}</Td>
            <Td isNumeric>{invoice.payment}</Td>
            <Td>
              <Button
                bgColor="cyan.500"
                color="white"
                onClick={() => navigate(`/issue/${invoice.invoiceLogId}`)}
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
