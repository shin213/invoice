import { Box, HStack, AspectRatio } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton, SecondaryButton } from '../../components/atoms/Buttons'
import InvoiceSteps from '../../components/molecules/InvoiceSteps'
import LoginTemplate from '../../components/templates/LoginTemplate'
import { generateInvoicePDF } from '../../lib/generateInvoicePDF'

const InvoiceDetailPage: React.VFC = () => {
  const navigate = useNavigate()

  const doc = generateInvoicePDF()
  const datauristring = doc.output('datauristring')

  return (
    <LoginTemplate>
      <Box bg="white" p={4}>
        <InvoiceSteps />
      </Box>
      <AspectRatio ratio={4 / 3}>
        <Box bg="white" p={4} width="100%">
          <iframe width="100%" height="100%" src={datauristring}></iframe>
        </Box>
      </AspectRatio>
      <Box bg="white" p={4}>
        <HStack>
          <PrimaryButton onClick={() => navigate('request')}>承認リクエスト</PrimaryButton>
          <PrimaryButton onClick={() => navigate('approval')}>承認画面へ</PrimaryButton>
          <SecondaryButton onClick={() => navigate('inquiry')}>
            以前の担当者に問い合わせる
          </SecondaryButton>
        </HStack>
      </Box>
    </LoginTemplate>
  )
}

export default InvoiceDetailPage
