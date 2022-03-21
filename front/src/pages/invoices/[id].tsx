import { Box, HStack } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton, SecondaryButton } from '../../components/atoms/Buttons'
import InvoiceSteps from '../../components/molecules/InvoiceSteps'
import LoginTemplate from '../../components/templates/LoginTemplate'
import InvoicePDF from '../../components/molecules/InvoicePDF'
import { toInvoiceDataProps, generateInvoicePDF } from '../../lib/generateInvoicePDF'
import { useInvoicePdfQuery } from '../../generated/graphql'

const dummyId = 'fd4aebf6-559f-4a21-b655-b5483a9a0fab'

const InvoiceDetailPage: React.VFC = () => {
  const navigate = useNavigate()

  const invoiceLogId = dummyId
  const { loading, error, data } = useInvoicePdfQuery({ variables: { invoiceLogId } })
  if (loading || error || !data) {
    if (error) {
      console.error(error)
    }
    return (
      <LoginTemplate>
        <Box bg="white" p={4}>
          <InvoiceSteps />
        </Box>
      </LoginTemplate>
    )
  }
  const invoiceData = toInvoiceDataProps(data)
  const doc = generateInvoicePDF(invoiceData)

  return (
    <LoginTemplate>
      <Box bg="white" p={4}>
        <InvoiceSteps />
      </Box>
      <InvoicePDF doc={doc} />
      <Box bg="white" p={4}>
        <HStack>
          <PrimaryButton onClick={() => navigate('request')}>承認リクエスト</PrimaryButton>
          <PrimaryButton onClick={() => navigate('approval')}>承認画面へ</PrimaryButton>
          <SecondaryButton onClick={() => doc.save('請求書.pdf')}>PDF 保存</SecondaryButton>
          <SecondaryButton onClick={() => navigate('inquiry')}>
            以前の担当者に問い合わせる
          </SecondaryButton>
        </HStack>
      </Box>
    </LoginTemplate>
  )
}

export default InvoiceDetailPage
