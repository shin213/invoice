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
    mutationOptionsWithMsg(toast, '受領と承認申請を行いました。'),
  )

  const [approveInvoice] = useInvoiceIdApproveMutation(
    mutationOptionsWithMsg(toast, '承認と承認申請を行いました。'),
  )
  const [declineInvoice] = useInvoiceIdDeclineMutation(
    mutationOptionsWithMsg(toast, '申請の差戻しを行いました。'),
  )
  const [reapplyInvoice] = useInvoiceIdReapplyMutation(
    mutationOptionsWithMsg(toast, '申請の再申請を行いました。'),
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
