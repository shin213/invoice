import { Box, Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import NewInvoicesTable from '../../components/molecules/NewInvoicesTable'
import LoginTemplate from '../../components/templates/LoginTemplate'
import { useApprovalsQuery } from '../../generated/graphql'

const IssueListPage: React.VFC = () => {
  const { loading, error, data } = useApprovalsQuery()
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
