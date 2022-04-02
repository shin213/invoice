import { Box, Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import InvoicesTable from '../components/molecules/InvoicesTable'
import LoginTemplate from '../components/templates/LoginTemplate'
import { useReceiptsQuery } from '../generated/graphql'

const ReceiptsPage: React.VFC = () => {
  const { data, error } = useReceiptsQuery()

  if (error) {
    console.error(error)
  }

  return (
    <LoginTemplate>
      <Stack>
        <Heading as="h1" size="md" textAlign="center">
          受領
        </Heading>
        {data && (
          <Box bg="white" p={4} borderRadius="md" shadow="md">
            <InvoicesTable invoices={data.notRequestedInvoices} />
          </Box>
        )}
      </Stack>
    </LoginTemplate>
  )
}

export default ReceiptsPage
