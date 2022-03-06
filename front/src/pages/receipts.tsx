import { Box, Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import InvoicesTable from '../components/molecules/InvoicesTable'
import LoginTemplate from '../components/templates/LoginTemplate'
import { useInvoicesQuery } from '../generated/graphql'

const ReceiptsPage: React.VFC = () => {
  const { data, loading, error } = useInvoicesQuery()

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
          受領
        </Heading>
        <Box bg="white" p={4} borderRadius="md" shadow="md">
          <InvoicesTable invoices={data.notRequestedInvoices}/>
        </Box>
      </Stack>
    </LoginTemplate>
  )
}

export default ReceiptsPage