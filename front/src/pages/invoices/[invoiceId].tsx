import {
  Box,
  HStack,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ErrorButton, PrimaryButton, SecondaryButton } from '../../components/atoms/Buttons'
import LoginTemplate from '../../components/templates/LoginTemplate'
import InvoicePDF from '../../components/molecules/InvoicePDF'
import {
  InvoiceIdQuery,
  useInvoiceIdApproveMutation,
  useInvoiceIdDeclineMutation,
  useInvoiceIdDeclineToInputMutation,
  useInvoiceIdQuery,
  useInvoiceIdReapplyMutation,
  useInvoiceIdReceiveMutation,
} from '../../generated/graphql'
import { generateInvoicePDF, toInvoiceDataProps } from '../../lib/generateInvoicePDF'
import { TextArea } from '../../components/atoms/TextArea'
import CheckableUsersTable from '../../components/molecules/CheckableUsersTable'
import { mutationOptionsWithMsg } from '../../utils'
import { convertToActionLogs } from '../../utils/InvoiceActionLog'
import InvoiceActionLogs from '../../components/molecules/InvoiceActionLogs'

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

type ReceiveInvoiceModalProps = {
  users: {
    __typename?: unknown
    id: string
    familyName: string
    givenName: string
    familyNameFurigana: string
    givenNameFurigana: string
    email: string
    isAdmin: boolean
    employeeCode?: string | null
  }[]
  isOpen: boolean
  onClose: () => void
  handleReceipt: (comment: string, requestReceiverIds: string[]) => Promise<void>
}

const ReceiveInvoiceModal: React.VFC<ReceiveInvoiceModalProps> = ({
  users,
  isOpen,
  onClose,
  handleReceipt,
}: ReceiveInvoiceModalProps) => {
  const [comment, setComment] = useState('')
  const onChangeComment: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => {
    setComment(e.currentTarget.value)
  }, [])

  const [checkedUsers, setCheckedUsers] = useState(new Set<string>())

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>承認申請者を選択する</ModalHeader>
        <ModalCloseButton />

        {/* 入力form */}
        <ModalBody>
          <CheckableUsersTable
            users={users}
            checkedUsers={checkedUsers}
            setCheckedUsers={setCheckedUsers}
          />
          <TextArea placeholder="コメント" value={comment} onChange={onChangeComment} />
        </ModalBody>

        <ModalFooter>
          <PrimaryButton
            onClick={() => {
              handleReceipt(comment, Array.from(checkedUsers))
              onClose()
            }}
          >
            受領する
          </PrimaryButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

type ApproveInvoiceModalProps = {
  users: {
    __typename?: unknown
    id: string
    familyName: string
    givenName: string
    familyNameFurigana: string
    givenNameFurigana: string
    email: string
    isAdmin: boolean
    employeeCode?: string | null
  }[]
  isOpen: boolean
  onClose: () => void
  handleApproval: (comment: string, requestReceiverIds: string[]) => Promise<void>
}

const ApproveInvoiceModal: React.VFC<ApproveInvoiceModalProps> = ({
  users,
  isOpen,
  onClose,
  handleApproval,
}: ApproveInvoiceModalProps) => {
  const [comment, setComment] = useState('')
  const onChangeComment: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => {
    setComment(e.currentTarget.value)
  }, [])

  const [checkedUsers, setCheckedUsers] = useState(new Set<string>())

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>承認申請者を選択する</ModalHeader>
        <ModalCloseButton />

        {/* 入力form */}
        <ModalBody>
          <CheckableUsersTable
            users={users}
            checkedUsers={checkedUsers}
            setCheckedUsers={setCheckedUsers}
          />
          <TextArea placeholder="コメント" value={comment} onChange={onChangeComment} />
        </ModalBody>

        <ModalFooter>
          <PrimaryButton
            onClick={() => {
              handleApproval(comment, Array.from(checkedUsers))
              onClose()
            }}
          >
            承認する
          </PrimaryButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

const InvoiceDetailPage: React.FC = () => {
  const invoiceId = useParams().invoiceId ?? ''
  const { loading, error, data, refetch } = useInvoiceIdQuery({
    variables: { id: invoiceId },
    fetchPolicy: 'no-cache',
  })

  const handleRefetch = useCallback(async () => {
    await refetch()
  }, [refetch])

  // TODO: loading対応（skeletonなど）
  if (loading || error || !data) {
    if (error) {
      console.error(error)
    }
    return <LoginTemplate />
  }
  console.log(data)
  return <_InvoiceDetailPage invoiceId={invoiceId} data={data} handleRefetch={handleRefetch} />
}

type _InvoiceDetailPageProps = {
  invoiceId: string
  data: InvoiceIdQuery
  handleRefetch: () => Promise<void>
}

const _InvoiceDetailPage: React.VFC<_InvoiceDetailPageProps> = ({
  invoiceId,
  data,
  handleRefetch,
}: _InvoiceDetailPageProps) => {
  const toast = useToast()

  // for request create modal
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [receiveInvoice] = useInvoiceIdReceiveMutation(
    mutationOptionsWithMsg(
      toast,
      '受領と承認申請を行いました。',
      errorMessageTranslation,
      handleRefetch,
    ),
  )

  const [declineToInput] = useInvoiceIdDeclineToInputMutation(
    mutationOptionsWithMsg(
      toast,
      '協力会社へ差し戻しを行いました。',
      errorMessageTranslation,
      handleRefetch,
    ),
  )

  const [approveRequest] = useInvoiceIdApproveMutation(
    mutationOptionsWithMsg(
      toast,
      '承認と承認申請を行いました。',
      errorMessageTranslation,
      handleRefetch,
    ),
  )
  const [declineRequest] = useInvoiceIdDeclineMutation(
    mutationOptionsWithMsg(
      toast,
      '申請の差戻しを行いました。',
      errorMessageTranslation,
      handleRefetch,
    ),
  )
  const [reapplyRequest] = useInvoiceIdReapplyMutation(
    mutationOptionsWithMsg(toast, '再申請を行いました。', errorMessageTranslation, handleRefetch),
  )

  const handleApproval = useCallback(
    async (comment: string, requestReceiverIds: string[]) => {
      if (requestReceiverIds.length === 0) {
        toast({
          description: '承認申請者を一人以上指定してください。',
          status: 'error',
          position: 'top',
          isClosable: true,
        })
        return
      }
      if (data.invoice.requestPairStatus.receiverRequest == undefined) {
        toast({
          description: '承認申請を行えませんでした。',
          status: 'error',
          position: 'top',
          isClosable: true,
        })
        return
      }
      const result = await approveRequest({
        variables: {
          input: {
            requestId: data.invoice.requestPairStatus.receiverRequest.id,
            receiverIds: requestReceiverIds,
            comment,
          },
        },
      })
      console.log(result)
    },
    [data, approveRequest, toast],
  )

  const handleReceipt = useCallback(
    async (comment: string, requestReceiverIds: string[]) => {
      if (requestReceiverIds.length === 0) {
        toast({
          description: '受領者を一人以上指定してください。',
          status: 'error',
          position: 'top',
          isClosable: true,
        })
        return
      }
      const result = await receiveInvoice({
        variables: {
          input: {
            invoiceId,
            nextReceiverIds: requestReceiverIds,
            comment,
          },
        },
      })
      console.log(result)
    },
    [data, receiveInvoice, toast],
  )

  const handleDeclineToInput = useCallback(async () => {
    const result = await declineToInput({
      variables: {
        input: {
          invoiceId,
          comment: '', // TODO: comment
        },
      },
    })
    console.log(result)
  }, [data, declineToInput, toast])

  const handleDecline = useCallback(async () => {
    if (data.invoice.requestPairStatus.requesterRequest == undefined) {
      toast({
        description: '差し戻しを行えませんでした。',
        status: 'error',
        position: 'top',
        isClosable: true,
      })
      return
    }
    const result = await declineRequest({
      variables: {
        input: {
          requestId: data.invoice.requestPairStatus.requesterRequest.id,
          comment: '', // TODO: comment
        },
      },
    })
    console.log(result)
  }, [data, declineRequest, toast])

  const handleReapply = useCallback(async () => {
    if (data.invoice.requestPairStatus.receiverRequest == undefined) {
      toast({
        description: '再申請を行えませんでした。',
        status: 'error',
        position: 'top',
        isClosable: true,
      })
      return
    }
    const result = await reapplyRequest({
      variables: {
        input: {
          requestId: data.invoice.requestPairStatus.receiverRequest.id,
          comment: '', // TODO: comment
        },
      },
    })
    console.log(result)
  }, [data, reapplyRequest, toast])

  const invoiceData = toInvoiceDataProps(data)

  const doc = generateInvoicePDF(invoiceData)

  // 表示するボタン, パラメータを制御する処理
  // TODO: 他のstatusに対応する処理
  let buttons
  if (data.invoice.status === 'awaitingReceipt') {
    // 受領中
    buttons = (
      <HStack>
        <PrimaryButton onClick={onOpen}>受領する</PrimaryButton>
        <ErrorButton onClick={() => handleDeclineToInput()}>差し戻す</ErrorButton>
        <ReceiveInvoiceModal
          users={data.users}
          isOpen={isOpen}
          onClose={onClose}
          handleReceipt={handleReceipt}
        />
      </HStack>
    )
  } else if (data.invoice.requestPairStatus.invoiceStatusFromUserView === 'approving') {
    // 承認中
    buttons = (
      <HStack>
        <PrimaryButton onClick={onOpen}>承認する</PrimaryButton>
        <ErrorButton onClick={() => handleDecline()}>差し戻す</ErrorButton>
        <SecondaryButton onClick={() => doc.save('請求書.pdf')}>PDF 保存</SecondaryButton>
        <SecondaryButton onClick={() => alert('未実装')}>コメント</SecondaryButton>
        <ApproveInvoiceModal
          users={data.users}
          isOpen={isOpen}
          onClose={onClose}
          handleApproval={handleApproval}
        />
      </HStack>
    )
  } else if (data.invoice.requestPairStatus.invoiceStatusFromUserView === 'handling') {
    // 差戻し中
    buttons = (
      <HStack>
        <PrimaryButton onClick={() => handleReapply()}>再承認申請する</PrimaryButton>
        <ErrorButton onClick={() => handleDecline()}>差し戻す</ErrorButton>
        <SecondaryButton onClick={() => doc.save('請求書.pdf')}>PDF 保存</SecondaryButton>
        <SecondaryButton onClick={() => alert('未実装')}>コメント</SecondaryButton>
      </HStack>
    )
  } else if (
    data.invoice.requestPairStatus.invoiceStatusFromUserView === 'approvedAwaitingNextApproval'
  ) {
    // TODO: design
    buttons = (
      <HStack>
        <Box>承認待ちです</Box>
      </HStack>
    )
  } else if (data.invoice.requestPairStatus.invoiceStatusFromUserView === 'approvedNextApproved') {
    // TODO: design
    buttons = (
      <HStack>
        <Box>承認完了しました</Box>
      </HStack>
    )
  }

  // let constructionName, receiptName, approvalName1, approvalName2
  // if (data.invoice.status === 'inputtingWithSystem') {
  //   constructionName = data.invoice.construction?.name || ''
  //   receiptName = `${data.invoice.createdBy.familyName} ${data.invoice.createdBy.givenName}`
  //   approvalName1 = ''
  //   approvalName2 = ''
  // } else {
  //   constructionName = ''
  //   receiptName = ''
  //   approvalName1 = ''
  //   approvalName2 = ''
  // }

  return (
    <LoginTemplate>
      <Flex>
        <Box bg="white" height="100vh">
          <Tabs>
            <TabList>
              <Tab>請求書情報</Tab>
              <Tab>ログ</Tab>
              <Tab>アクション</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>TODO!</TabPanel>
              <TabPanel>
                <InvoiceActionLogs
                  flows={convertToActionLogs(
                    data.invoice.requests.flatMap((req) => req.judgements),
                    data.invoice,
                  )}
                  invoice={data.invoice}
                />
              </TabPanel>
              <TabPanel>{buttons}</TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        <Box bg="white" height="100vh" flex="1">
          <InvoicePDF doc={doc} />
        </Box>
        {/* {data && (
        <Box bg="white" p={4}>
          <InvoiceSteps
            constructionName={constructionName}
            receiptName={receiptName}
            approvalName1={approvalName1}
            approvalName2={approvalName2}
            status={data.invoice.status}
          ></InvoiceSteps>
        </Box>
      )} */}
      </Flex>
    </LoginTemplate>
  )
}

export default InvoiceDetailPage
