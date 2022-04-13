import {
  AspectRatio,
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Wrap,
  WrapItem,
  useToast,
} from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import { MdSend } from 'react-icons/md'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ValueType } from '../../../components/molecules/NewInvoiceEditor'
import LoginTemplate from '../../../components/templates/LoginTemplate'
import InvoicePDF from '../../../components/molecules/InvoicePDF'
import { toInvoiceDataProps, generateInvoicePDF } from '../../../lib/generateInvoicePDF'
import {
  IssueIdViewQuery,
  useIssueIdViewQuery,
  useIssueIdViewSendInvoiceMutation,
} from '../../../generated/graphql'
import { mutationOptions } from '../../../utils'

const errorMessageTranslation: Record<string, string> = {
  'Invoice does not belong to this company': '企業エラーです。運営までお問い合わせください。',
  'Receiver Request Not Found': '受信者が自分であるリクエストが見つかりません。',
  'You are not a receiver of this request': 'あなたは受信者ではありません。',
  'Invoice Not Found': '請求書が見つかりません。',
  'Invoice status is not inputtingWithSystem': '請求書の状態が「入力中」ではありません。',
  'nextReceiverIds is empty': '承認者が未選択です。',
  'Invoice status is not awaitingReceipt': '請求書の状態が「受領待ち」ではありません。',
  'receiverIds is empty': '承認者が未選択です。',
  'Request Not Found': 'リクエストが見つかりません。',
  'Invoice status is not underApproval': '請求書の状態が「承認中」ではありません。',
  'The status of this request is not correct: duplicated users of requests':
    'リクエストの状態が正しくありません。複数のユーザーが別のリクエストに含まれています。',
  'Received Request is not awaiting': 'リクエストの状態が不適切です。',
  'ReceiverIds include previouds requesters': '承認者が今までの承認者を含んでいます。',
  'You cannot approve your own request': '自分自身で承認することはできません。',
  'Received Request is not declined': 'リクエストの状態が不適切です。',
  'receiver cannot be requester': '承認者は申請者にはなれません。',
}

export type NewInvoiceViewPageElement = {
  order: number
  label: string
  value?: string | null
  valueType: ValueType
  own: boolean
}

const NewInvoiceViewPage: React.VFC = () => {
  const invoiceId = useParams().invoiceId ?? ''
  const { loading, error, data } = useIssueIdViewQuery({
    variables: { id: invoiceId ?? '' },
    fetchPolicy: 'no-cache',
  })
  if (loading || error || !data) {
    if (error) {
      console.error(error)
    }
    return (
      <LoginTemplate>
        <></>
      </LoginTemplate>
    )
  }

  return <_NewInvoiceViewPage invoiceId={invoiceId} data={data} />
}

type _NewInvoiceViewPageProps = {
  readonly invoiceId: string
  readonly data: IssueIdViewQuery
}

const _NewInvoiceViewPage: React.VFC<_NewInvoiceViewPageProps> = ({
  invoiceId,
  data,
}: _NewInvoiceViewPageProps) => {
  const navigate = useNavigate()
  const location = useLocation()

  const toast = useToast()

  const [sendInvoice] = useIssueIdViewSendInvoiceMutation(
    mutationOptions(
      toast,
      () => {
        toast({
          title: '送信できました',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        navigate('../issue')
      },
      errorMessageTranslation,
    ),
  )
  const [args] = useState<{ body: NewInvoiceViewPageElement[] }>(
    location.state as { body: NewInvoiceViewPageElement[] },
  )

  const invoiceData = toInvoiceDataProps(data)
  const doc = generateInvoicePDF(invoiceData)

  const handleSendInvoice = useCallback(() => {
    // TODO: comment を指定できるように
    sendInvoice({ variables: { input: { invoiceId, comment: '' } } })
  }, [sendInvoice, invoiceId, toast])

  return (
    <LoginTemplate>
      <AspectRatio ratio={4 / 3} width="100%">
        <InvoicePDF doc={doc} />
      </AspectRatio>
      <Box bg="white" p={4}>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>項目</Th>
              <Th>値</Th>
            </Tr>
          </Thead>
          <Tbody>
            {args.body.map((element) => (
              <Tr key={element.order}>
                <Td>{element.label}</Td>
                <Td>
                  {element.valueType === 'number'
                    ? Number(element.value).toLocaleString()
                    : element.value}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Box bg="white" p={2} />
        <Wrap spacing="30px" align="center" justify="right">
          <WrapItem>
            <Button bgColor="primary.500" color="white" onClick={() => handleSendInvoice()}>
              <MdSend title="送信" />
              <Box p="2">送信</Box>
            </Button>
          </WrapItem>
        </Wrap>
      </Box>
    </LoginTemplate>
  )
}

export default NewInvoiceViewPage
