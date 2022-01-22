import { Box } from '@chakra-ui/react'
import React from 'react'
import InvoiceSteps from '../../components/molecules/InvoiceSteps'
import LoginTemplate from '../../components/templates/LoginTemplate'

const RequestDetail: React.VFC = () => (
  <LoginTemplate>
    <Box bg="white" p={4}>
      <InvoiceSteps />
    </Box>
  </LoginTemplate>
)

export default RequestDetail
