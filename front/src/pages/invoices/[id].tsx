import { Box, HStack, AspectRatio } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton, SecondaryButton } from '../../components/atoms/Buttons'
import InvoiceSteps from '../../components/molecules/InvoiceSteps'
import LoginTemplate from '../../components/templates/LoginTemplate'
import { invoiceDataProps, generateInvoicePDF } from '../../lib/generateInvoicePDF'
import { InvoicePdfQuery, useInvoicePdfQuery } from '../../generated/graphql'

function toInvoiceDataProps(data: InvoicePdfQuery): invoiceDataProps {
  const idToLabel: Record<string, string> = Object.fromEntries(
    data.getInvoiceLog.invoiceFormatLog.elements.map(({ id, label }) => [id, label]),
  )

  const labelToValue: Record<string, string> = Object.fromEntries(
    data.getInvoiceLog.body
      .filter(({ elementId }) => idToLabel[elementId] != null)
      .map(({ elementId, value }) => [idToLabel[elementId], value]),
  )

  // TODO: 「差引残額」「備考」の反映
  const invoiceData: invoiceDataProps = {
    invoiceTitleFirstPage: data.getInvoiceLog.invoiceFormatLog.invoiceFormat.name ?? '',
    recipientCompany: data.getInvoiceLog.invoiceFormatLog.invoiceFormat.company.name ?? '',
    constructionName: '燈ビル新築工事',
    submitDate: labelToValue['請求日'] ?? '',
    companyReferenceNumber: 'UMI20150303',
    transactionOverviewTable: {
      transactionName: '防水工事',
      constructionPeriod: '2020/12/04　～　2021/12/25',
      orderNumber: labelToValue['注文書番号'] ?? '',
    },
    mainBillingTable: {
      billingAmountIncludingTax: `￥${labelToValue['今回請求金額（税込）'] ?? ''}`,
      thisMonthAmountExcludingTax: `￥${labelToValue['今回請求額'] ?? ''}`,
      consumptionTax: '￥4,105',
    },
    subBillingTable: {
      contractAmountIncludingTax: `￥${labelToValue['注文契約額'] ?? ''}`,
      cumulativeBillingAmountUntilLastTimeIncludingTax: `￥${labelToValue['前回迄請求額'] ?? ''}`,
      cumulativeBillingAmountUntilCurrentTimeIncludingTax: `￥${labelToValue['請求累計額'] ?? ''}`,
    },
    terminationSettlementAmount: '',
    billingCount: '2',
    completionState: '',
    companyInformationTable: {
      companyReferenceCode: labelToValue['取引先コード'] ?? '',
      companyName: 'アカリ工務店',
      companyPostalCode: '〒113-0033',
      companyAddress: labelToValue['住所'] ?? '',
      phoneNumber: labelToValue['電話番号'] ?? '',
      personInCharge: labelToValue['氏名'] ?? '',
    },
    invoiceTitleSecondPage: '内訳明細書',
    invoiceItems: [
      {
        name: '外壁　ACL坂足元',
        specification: 'シーリング',
        contraction: {
          quantity: '100.000',
          unit: 'm',
          unitPrice: '1,000.0',
          price: '100,000',
        },
        billingAmountCurrentTime: {
          quantity: '30.000',
          unitPrice: '1,000.0',
          price: '30,000',
        },
        cumulativeBillingAmountUntilCurrentTime: {
          quantity: '60.000',
          price: '60,000',
        },
      },
      {
        name: 'AW周囲',
        specification: 'シーリング',
        contraction: {
          quantity: '33.333',
          unit: 'm',
          unitPrice: '1,000.0',
          price: '33,333',
        },
        billingAmountCurrentTime: {
          quantity: '11.050',
          unitPrice: '1,000.0',
          price: '11,050',
        },
        cumulativeBillingAmountUntilCurrentTime: {
          quantity: '21.050',
          price: '21,050',
        },
      },
      {
        name: '既存外壁～水切取台',
        specification: 'シーリング',
        contraction: {
          quantity: '100.000',
          unit: 'm',
          unitPrice: '750.0',
          price: '75,000',
        },
        billingAmountCurrentTime: {
          quantity: '0.000',
          unitPrice: '750.0',
          price: '0',
        },
        cumulativeBillingAmountUntilCurrentTime: {
          quantity: '0.000',
          price: '0',
        },
      },
      {
        name: 'ACL板間',
        specification: 'シーリング',
        contraction: {
          quantity: '100.000',
          unit: 'm',
          unitPrice: '750.0',
          price: '75,000',
        },
        billingAmountCurrentTime: {
          quantity: '0.000',
          unitPrice: '750.0',
          price: '0',
        },
        cumulativeBillingAmountUntilCurrentTime: {
          quantity: '0.000',
          price: '0',
        },
      },
    ],
  }
  return invoiceData
}

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
