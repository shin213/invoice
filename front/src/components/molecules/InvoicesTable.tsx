import { Table, Thead, Tr, Th, Tbody, Td, Tfoot } from '@chakra-ui/react'
import React from 'react'

const data = [
  {
    companyName: 'ツバキ建設株式会社',
    constructionName: 'ツバキビル新築工事',
    billingDate: '2021/2/3',
    dueDate: '2021/2/28',
    payment: '41,494',
    status: '確認中',
  },
  {
    companyName: 'サクラ建設株式会社',
    constructionName: 'サクラビル新築工事',
    billingDate: '2021/2/3',
    dueDate: '2021/2/28',
    payment: '356,100',
    status: '差し戻し',
  },
  {
    companyName: 'バラ建設株式会社',
    constructionName: 'バラビル新築工事',
    billingDate: '2021/2/3',
    dueDate: '2021/2/28',
    payment: '103,134',
    status: '受領済',
  },
  {
    companyName: 'すみれ建設株式会社',
    constructionName: 'すみれビル新築工事',
    billingDate: '2021/2/3',
    dueDate: '2021/2/28',
    payment: '456,100',
    status: '受領済',
  },
]

const InvoicesTable: React.VFC = () => (
  <Table variant="striped">
    {' '}
    {/*colorScheme="cyan"*/}
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
      {data.map((invoice) => (
        <Tr key={invoice.constructionName}>
          <Td>{invoice.companyName}</Td>
          <Td>{invoice.constructionName}</Td>
          <Td>{invoice.billingDate}</Td>
          <Td>{invoice.dueDate}</Td>
          <Td isNumeric>{invoice.payment}</Td>
          <Td>{invoice.status}</Td>
          <Td>確認</Td>
        </Tr>
      ))}
    </Tbody>
    <Tfoot>
      <Tr>
        <Th>企業名</Th>
        <Th>工事名</Th>
        <Th>請求日</Th>
        <Th>支払い期限</Th>
        <Th isNumeric>支払い金額</Th>
        <Th>ステータス</Th>
        <Th>原本表示</Th>
      </Tr>
    </Tfoot>
  </Table>
)

export default InvoicesTable
