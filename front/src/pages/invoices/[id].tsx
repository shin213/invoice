import { Box, HStack } from '@chakra-ui/react'
import React from 'react'
import { PrimaryButton, SecondaryButton } from '../../components/atoms/Buttons'
import InvoiceSteps from '../../components/molecules/InvoiceSteps'
import LoginTemplate from '../../components/templates/LoginTemplate'

const InvoiceDetail: React.VFC = () => (
  <LoginTemplate>
    <Box bg="white" p={4}>
      <InvoiceSteps />
    </Box>
    <Box bg="white" p={4}>
      <HStack>
        <PrimaryButton>承認リクエスト</PrimaryButton>
        <SecondaryButton>以前の担当者に問い合わせる</SecondaryButton>
      </HStack>
    </Box>
  </LoginTemplate>
)

export default InvoiceDetail
