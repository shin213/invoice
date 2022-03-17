import {
  Box,
  HStack,
  AspectRatio,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PrimaryButton, SecondaryButton } from '../../components/atoms/Buttons'
import DummyInvoiceSteps from '../../components/molecules/DummyInvoiceSteps'
import InvoiceSteps from '../../components/molecules/InvoiceSteps'
import LoginTemplate from '../../components/templates/LoginTemplate'
import { useGetInvoiceDetailQuery, GetInvoiceDetailQuery, useCreateApprovalRequestMutation } from '../../generated/graphql'
import { invoiceDataProps, generateInvoicePDF } from '../../lib/generateInvoicePDF'
import { TextArea } from '../../components/atoms/TextArea'
import CheckableUsersTable from '../../components/molecules/CheckableUsersTable'

type invoiceLogProp = GetInvoiceDetailQuery['getInvoiceLog']

function toInvoiceDataProps(invoiceLog: invoiceLogProp): invoiceDataProps {
  const idToLabel: Record<string, string> = Object.fromEntries(
    invoiceLog.invoiceFormatLog.elements.map(({ id, label }) => [id, label]),
  )
  const labelToValue: Record<string, string> = Object.fromEntries(
    invoiceLog.body
      .filter(({ elementId }) => idToLabel[elementId] != null)
      .map(({ elementId, value }) => [idToLabel[elementId], value]),
  )

  const sortedDetailElements = [...invoiceLog.invoiceFormatLog.detailElements]
  sortedDetailElements.sort((e1, e2) => e1.order - e2.order)
  const invoiceDetailTableHeader = sortedDetailElements.map(({ label }) => label)
  const invoiceDetailTableItems = invoiceLog.detail.map((detailRow) => {
    const detailRowMap = Object.fromEntries(
      detailRow.map(({ elementId, value }) => [elementId, value]),
    )
    return sortedDetailElements.map(({ id }) => detailRowMap[id] ?? '')
  })

  // TODO: 「差引残額」「備考」の反映
  const invoiceData: invoiceDataProps = {
    invoiceTitleFirstPage: invoiceLog.invoiceFormatLog.invoiceFormat.name ?? '',
    recipientCompany: invoiceLog.invoiceFormatLog.invoiceFormat.company.name ?? '',
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
    invoiceDetailTable: {
      header: invoiceDetailTableHeader,
      items: invoiceDetailTableItems,
    },
  }
  return invoiceData
}

// ひとまずgqlの方に埋め込んだ
// const dummyId = 'fd4aebf6-559f-4a21-b655-b5483a9a0fab'

const InvoiceDetailPage: React.VFC = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const invoiceId = id || ''

  const toast = useToast()

  // for request create modal
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [comment, setComment] = useState<string>('')
  const onChangeComment: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => {
    setComment(e.currentTarget.value)
  }, [])
  const [checkedUsers, setCheckedUsers] = useState<Set<number>>(new Set())

  const { loading, error, data } = useGetInvoiceDetailQuery({ variables: { id: invoiceId } })

  const [createApprovalRequet] = useCreateApprovalRequestMutation({
    onCompleted(data) {
      toast({
        description: JSON.stringify(data),
        status: 'success',
        position: 'top',
        isClosable: true,
      })
    },
    onError(err) {
      toast({
        description: JSON.stringify(err),
        status: 'error',
        position: 'top',
        isClosable: true,
      })
    },
  })

  // TODO: early returnで描画する内容を決める：for review
  if (loading || error || !data) {
    if (error) {
      console.error(error)
    }
    return (
      <LoginTemplate>
        <Box bg="white" p={4}>
          <DummyInvoiceSteps />
        </Box>
      </LoginTemplate>
    )
  }
  const invoiceData = toInvoiceDataProps(data.getInvoiceLog)

  const doc = generateInvoicePDF(invoiceData)
  const datauristring = doc.output('datauristring')

  const onClickCreateApprovalRequest = async (comment: string, requestReceiverIds: number[]) => {
    const result = await createApprovalRequet({
      variables: {
        newRequest: {
          comment,
          invoiceId,
          requestReceiverIds,
          requesterId: 1, // dummy id; TODO: login userからidを取りたい：for review
        },
      },
    })
    console.log(result)
  }

  // TODO: ここの処理、もっといい書き方ありそう：for review
  // 表示するボタン, パラメータを制御する処理
  let buttons, constructionName, receiptName, approvalName1, approvalName2
  if (data.getInvoice.status == 'notRequested') {
    buttons = (
      <HStack>
        <PrimaryButton onClick={onOpen}>受領する</PrimaryButton>
        <PrimaryButton onClick={() => console.log('差戻')}>差し戻す</PrimaryButton>

        {/* Request作成用のModal */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>承認リクエストを送信する</ModalHeader>
            <ModalCloseButton />

            {/* 入力form */}
            <ModalBody>
              <CheckableUsersTable
                users={data.users}
                checkedUsers={checkedUsers}
                setCheckedUsers={setCheckedUsers}
              />
              <TextArea placeholder="コメント" value={comment} onChange={onChangeComment} />
            </ModalBody>

            <ModalFooter>
              <PrimaryButton
                onClick={() => {
                  onClickCreateApprovalRequest(comment, Array.from(checkedUsers))
                  onClose()
                }}
              >
                受領する
              </PrimaryButton>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </HStack>
    )
    constructionName = data.getInvoice.construction?.name || ''
    receiptName = `${data.getInvoice.createdBy.familyName} ${data.getInvoice.createdBy.givenName}`
    approvalName1 = ''
    approvalName2 = ''
  } else {
    // TODO: 他のstatusに対応する処理
    buttons = (
      <HStack>
        <PrimaryButton onClick={() => navigate('request')}>承認リクエスト</PrimaryButton>
        <PrimaryButton onClick={() => navigate('approval')}>承認画面へ</PrimaryButton>
        <SecondaryButton onClick={() => doc.save('請求書.pdf')}>PDF 保存</SecondaryButton>
        <SecondaryButton onClick={() => navigate('inquiry')}>
          以前の担当者に問い合わせる
        </SecondaryButton>
      </HStack>
    )
    constructionName = ''
    receiptName = ''
    approvalName1 = ''
    approvalName2 = ''
  }

  return (
    <LoginTemplate>
      {data && (
        <Box bg="white" p={4}>
          <InvoiceSteps
            constructionName={constructionName}
            receiptName={receiptName}
            approvalName1={approvalName1}
            approvalName2={approvalName2}
            status={data.getInvoice.status}
          ></InvoiceSteps>
        </Box>
      )}
      <AspectRatio ratio={4 / 3}>
        <Box bg="white" p={4} width="100%">
          <iframe width="100%" height="100%" src={datauristring}></iframe>
        </Box>
      </AspectRatio>
      <Box bg="white" p={4}>
        {buttons}
      </Box>
    </LoginTemplate>
  )
}

export default InvoiceDetailPage
