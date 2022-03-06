import { Box, Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import DummyInvoicesTable from '../components/molecules/DummyInvoicesTable'
// import UsersTable from '../components/molecules/UsersTable'
import LoginTemplate from '../components/templates/LoginTemplate'


const ReceiptsPage: React.VFC = () => (
  <LoginTemplate>
    <Stack>
      <Heading as="h1" size="md" textAlign="center">
        受領
      </Heading>
      <Box bg="white" p={4} borderRadius="md" shadow="md">
        <DummyInvoicesTable />
      </Box>
    </Stack>
  </LoginTemplate>
)

export default ReceiptsPage