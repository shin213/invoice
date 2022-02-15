import { Box } from '@chakra-ui/react'
import React from 'react'
import LoginTemplate from '../../components/templates/LoginTemplate'
import NewInvoiceEditor from '../../components/molecules/NewInvoiceEditor'

const NewInvoiceDetailPage: React.VFC = () => (
  <LoginTemplate>
    <Box bg="white" p={4}>
      <NewInvoiceEditor />
    </Box>
  </LoginTemplate>
)

export default NewInvoiceDetailPage
