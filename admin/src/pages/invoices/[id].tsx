import { Box, HStack, AspectRatio } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton, SecondaryButton } from '../../components/atoms/Buttons'
import InvoiceSteps from '../../components/molecules/InvoiceSteps'
import LoginTemplate from '../../components/templates/LoginTemplate'
import { invoiceDataProps, generateInvoicePDF } from '../../lib/generateInvoicePDF'

const dummyInvoiceData: invoiceDataProps = {
  invoiceTitleFirstPage: '出来高報告　兼　請求書',
  recipientCompany: '燈建設株式会社',
  constructionName: '燈ビル新築工事',
  submitDate: '2021/02/03',
  companyReferenceNumber: 'UMI20150303',
  transactionOverviewTable: {
    transactionName: '防水工事',
    constructionPeriod: '2020/12/04　～　2021/12/25',
    orderNumber: 'U-210101-112345',
  },
  mainBillingTable: {
    billingAmountIncludingTax: '￥45,155',
    thisMonthAmountExcludingTax: '￥41,050',
    consumptionTax: '￥4,105',
  },
  subBillingTable: {
    contractAmountIncludingTax: '￥11,000,000',
    cumulativeBillingAmountUntilLastTimeIncludingTax: '￥0',
    cumulativeBillingAmountUntilCurrentTimeIncludingTax: '￥45,155',
  },
  terminationSettlementAmount: '',
  billingCount: '2',
  completionState: '',
  companyInformationTable: {
    companyReferenceCode: '1234567',
    companyName: 'アカリ工務店',
    companyPostalCode: '〒113-0033',
    companyAddress: '東京都文京区本郷 6-25-14 宗文館ビル3階',
    phoneNumber: '012-3456-7890',
    personInCharge: '山田太郎',
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

const dummyInvoiceData2: invoiceDataProps = {
  invoiceTitleFirstPage: 'サンプル請求書',
  recipientCompany: 'サンプル建設株式会社',
  constructionName: 'サンプルビル新築工事',
  submitDate: '1999/03/03',
  companyReferenceNumber: 'UMI19990303',
  transactionOverviewTable: {
    transactionName: 'サンプル工事',
    constructionPeriod: '1999/01/01　～　1999/05/05',
    orderNumber: 'U-990101-990505',
  },
  mainBillingTable: {
    billingAmountIncludingTax: '￥10,000',
    thisMonthAmountExcludingTax: '￥1,000',
    consumptionTax: '￥11,000',
  },
  subBillingTable: {
    contractAmountIncludingTax: '￥99,000,000',
    cumulativeBillingAmountUntilLastTimeIncludingTax: '￥50,000',
    cumulativeBillingAmountUntilCurrentTimeIncludingTax: '￥11,000',
  },
  terminationSettlementAmount: '￥123,456,789',
  billingCount: '100',
  completionState: '済',
  companyInformationTable: {
    companyReferenceCode: '7654321',
    companyName: 'サンプル工務店',
    companyPostalCode: '〒123-4567',
    companyAddress:
      '秋田県北秋田郡上小阿仁村大字沖田面字小蒲野下タ川原 12 丁目 34 番地 5 サンプルコーポレーション 12 階',
    phoneNumber: '098-7654-3210',
    personInCharge: '田中次郎',
  },
  invoiceTitleSecondPage: 'サンプル明細書',
  invoiceItems: [],
}

const InvoiceDetailPage: React.VFC = () => {
  const navigate = useNavigate()

  const doc = generateInvoicePDF(dummyInvoiceData)
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
