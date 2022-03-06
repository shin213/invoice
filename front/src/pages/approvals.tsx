import { Box, Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import DummyInvoicesTable from '../components/molecules/DummyInvoicesTable'
import UsersTable from '../components/molecules/UsersTable'
import LoginTemplate from '../components/templates/LoginTemplate'
import { useApprovalsQuery } from '../generated/graphql'

const ApprovalsPage: React.VFC = () => {
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
          申請
        </Heading>
        <Box bg="white" p={4} borderRadius="md" shadow="md">
          <DummyInvoicesTable />
        </Box>
        <Box bg="white" p={4} borderRadius="md" shadow="md">
          <UsersTable users={data.users} />
        </Box>
      </Stack>
    </LoginTemplate>
  )
}

export default ApprovalsPage
