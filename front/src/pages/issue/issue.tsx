import { Box, Button, Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import { MdAddCircleOutline } from 'react-icons/md'
import NewInvoicesTable from '../../components/molecules/NewInvoicesTable'
import LoginTemplate from '../../components/templates/LoginTemplate'
import { useIssuesQuery } from '../../generated/graphql'

const IssueListPage: React.VFC = () => {
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
      <Button bgColor="cyan.500" color="white">
        <MdAddCircleOutline title="新規作成" />
        <Box p="2">新規作成</Box>
      </Button>
      <Stack>
        <Heading as="h1" size="md" textAlign="center">
          下書き
        </Heading>
        <Box bg="white" p={4} borderRadius="md" shadow="md">
          <NewInvoicesTable />
        </Box>
      </Stack>
    </LoginTemplate>
  )
}

export default IssueListPage
