import { Box, Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import InvoicesTable from '../components/molecules/InvoicesTable'
import UsersTable from '../components/molecules/UsersTable'
import LoginTemplate from '../components/templates/LoginTemplate'
import { useRequestsQuery } from '../generated/graphql'

const RequestsPage: React.VFC = () => {
  const { loading, error, data } = useRequestsQuery()
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
          <InvoicesTable />
        </Box>
        <Box bg="white" p={4} borderRadius="md" shadow="md">
          <UsersTable users={data.users} />
        </Box>
      </Stack>
    </LoginTemplate>
  )
}

export default RequestsPage
