import { Box, Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import InvoicesTable from '../components/molecules/InvoicesTable'
import LoginTemplate from '../components/templates/LoginTemplate'

const StorePage: React.VFC = () => (
  <LoginTemplate>
    <Stack>
      <Heading as="h1" size="md" textAlign="center">
        保管
      </Heading>
      <Box bg="white" p={4} borderRadius="md" shadow="md">
        <InvoicesTable />
      </Box>
    </Stack>
  </LoginTemplate>
)

export default StorePage
