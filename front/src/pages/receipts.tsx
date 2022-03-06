import { Box, Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import InvoicesTable from '../components/molecules/InvoicesTable'
import LoginTemplate from '../components/templates/LoginTemplate'

const data = [
  {
    id: 1,
    companyName: 'ツバキ建設株式会社',
    constructionName: 'ツバキビル新築工事',
    billingDate: '2021/2/3',
    dueDate: '2021/2/28',
    payment: '41,494',
    status: '確認中',
  },
  {
    id: 742,
    companyName: 'サクラ建設株式会社',
    constructionName: 'サクラビル新築工事',
    billingDate: '2021/2/3',
    dueDate: '2021/2/28',
    payment: '356,100',
    status: '差し戻し',
  },
  {
    id: 743,
    companyName: 'バラ建設株式会社',
    constructionName: 'バラビル新築工事',
    billingDate: '2021/2/3',
    dueDate: '2021/2/28',
    payment: '103,134',
    status: '受領済',
  },
  {
    id: 744,
    companyName: 'ウメ建設株式会社',
    constructionName: 'ウメビル新築工事',
    billingDate: '2021/4/6',
    dueDate: '2021/5/28',
    payment: '56,100',
    status: '受領済',
  },
]

const ReceiptsPage: React.VFC = () => (
  <LoginTemplate>
    <Stack>
      <Heading as="h1" size="md" textAlign="center">
        受領
      </Heading>
      <Box bg="white" p={4} borderRadius="md" shadow="md">
        <InvoicesTable invoices={data}/>
      </Box>
    </Stack>
  </LoginTemplate>
)

export default ReceiptsPage