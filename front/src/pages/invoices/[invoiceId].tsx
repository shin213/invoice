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
} from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ErrorButton, PrimaryButton, SecondaryButton } from '../../components/atoms/Buttons'
import DummyInvoiceSteps from '../../components/molecules/DummyInvoiceSteps'
import LoginTemplate from '../../components/templates/LoginTemplate'
import InvoicePDF from '../../components/molecules/InvoicePDF'
import {
  InvoiceIdQuery,
  useInvoiceIdApproveMutation,
  useInvoiceIdDeclineMutation,
  useInvoiceIdQuery,
  useInvoiceIdReapplyMutation,
  useInvoiceIdReceiveMutation,
} from '../../generated/graphql'
import { generateInvoicePDF, toInvoiceDataProps } from '../../lib/generateInvoicePDF'
import { TextArea } from '../../components/atoms/TextArea'
import CheckableUsersTable from '../../components/molecules/CheckableUsersTable'
import { mutationOptionsWithMsg } from '../../utils'

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
  handleReceipt: handleApproval,
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
              handleApproval(comment, Array.from(checkedUsers))
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
  const { loading, error, data } = useInvoiceIdQuery({ variables: { id: invoiceId } })

  // TODO: loading対応（skeletonなど）
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
  console.log(data)
  return <_InvoiceDetailPage invoiceId={invoiceId} data={data} />
}

type _InvoiceDetailPageProps = {
  invoiceId: string
  data: InvoiceIdQuery
}

const _InvoiceDetailPage: React.VFC<_InvoiceDetailPageProps> = ({
  invoiceId,
  data,
}: _InvoiceDetailPageProps) => {
  const toast = useToast()

  // for request create modal
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [receiveInvoice] = useInvoiceIdReceiveMutation(
    mutationOptionsWithMsg(toast, '受領と承認申請を行いました。', errorMessageTranslation),
  )

  const [approveInvoice] = useInvoiceIdApproveMutation(
    mutationOptionsWithMsg(toast, '承認と承認申請を行いました。', errorMessageTranslation),
  )
  const [declineInvoice] = useInvoiceIdDeclineMutation(
    mutationOptionsWithMsg(toast, '申請の差戻しを行いました。', errorMessageTranslation),
  )
  const [reapplyInvoice] = useInvoiceIdReapplyMutation(
    mutationOptionsWithMsg(toast, '再申請を行いました。', errorMessageTranslation),
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
      if (data.getInvoice.requestPairStatus.receiverRequest == undefined) {
        toast({
          description: '承認申請を行えませんでした。',
          status: 'error',
          position: 'top',
          isClosable: true,
        })
        return
      }
      const result = await approveInvoice({
        variables: {
          input: {
            requestId: data.getInvoice.requestPairStatus.receiverRequest.id,
            receiverIds: requestReceiverIds,
            comment,
          },
        },
      })
      console.log(result)
    },
    [data, approveInvoice, toast],
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

  const handleDecline = useCallback(async () => {
    if (data.getInvoice.requestPairStatus.receiverRequest == undefined) {
      toast({
        description: '差し戻しを行えませんでした。',
        status: 'error',
        position: 'top',
        isClosable: true,
      })
      return
    }
    const result = await declineInvoice({
      variables: {
        input: {
          requestId: data.getInvoice.requestPairStatus.receiverRequest.id,
          comment: '', // TODO: comment
        },
      },
    })
    console.log(result)
  }, [data, declineInvoice, toast])

  const handleReapply = useCallback(async () => {
    if (data.getInvoice.requestPairStatus.receiverRequest == undefined) {
      toast({
        description: '再申請を行えませんでした。',
        status: 'error',
        position: 'top',
        isClosable: true,
      })
      return
    }
    const result = await reapplyInvoice({
      variables: {
        input: {
          requestId: data.getInvoice.requestPairStatus.receiverRequest.id,
          comment: '', // TODO: comment
        },
      },
    })
    console.log(result)
  }, [data, reapplyInvoice, toast])

  const invoiceData = toInvoiceDataProps(data)

  const doc = generateInvoicePDF(invoiceData)

  // 表示するボタン, パラメータを制御する処理
  // TODO: 他のstatusに対応する処理
  let buttons
  if (data.getInvoice.status === 'awaitingReceipt') {
    buttons = (
      <HStack>
        <PrimaryButton onClick={onOpen}>受領する</PrimaryButton>
        <ErrorButton onClick={() => handleDecline()}>差し戻す</ErrorButton>
        <ReceiveInvoiceModal
          users={data.users}
          isOpen={isOpen}
          onClose={onClose}
          handleReceipt={handleReceipt}
        />
      </HStack>
    )
  } else if (data.getInvoice.requestPairStatus.invoiceStatusFromUserView === 'approving') {
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
  } else if (data.getInvoice.requestPairStatus.invoiceStatusFromUserView === 'handling') {
    buttons = (
      <HStack>
        <PrimaryButton onClick={() => handleReapply()}>再承認申請する</PrimaryButton>
        <ErrorButton onClick={() => handleDecline()}>差し戻す</ErrorButton>
        <SecondaryButton onClick={() => doc.save('請求書.pdf')}>PDF 保存</SecondaryButton>
        <SecondaryButton onClick={() => alert('未実装')}>コメント</SecondaryButton>
      </HStack>
    )
  }

  // let constructionName, receiptName, approvalName1, approvalName2
  // if (data.getInvoice.status === 'inputtingWithSystem') {
  //   constructionName = data.getInvoice.construction?.name || ''
  //   receiptName = `${data.getInvoice.createdBy.familyName} ${data.getInvoice.createdBy.givenName}`
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
      <Box bg="white" p={4}>
        {buttons}
      </Box>
      <InvoicePDF doc={doc} />
      {/* {data && (
        <Box bg="white" p={4}>
          <InvoiceSteps
            constructionName={constructionName}
            receiptName={receiptName}
            approvalName1={approvalName1}
            approvalName2={approvalName2}
            status={data.getInvoice.status}
          ></InvoiceSteps>
        </Box>
      )} */}
    </LoginTemplate>
  )
}

export default InvoiceDetailPage
