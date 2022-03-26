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
import { useNavigate, useParams } from 'react-router-dom'
import { PrimaryButton, SecondaryButton } from '../../components/atoms/Buttons'
import DummyInvoiceSteps from '../../components/molecules/DummyInvoiceSteps'
import InvoiceSteps from '../../components/molecules/InvoiceSteps'
import LoginTemplate from '../../components/templates/LoginTemplate'
import InvoicePDF from '../../components/molecules/InvoicePDF'
import {
  useInvoiceIdQuery,
  useInvoiceIdCreateApprovalRequestMutation,
} from '../../generated/graphql'
import { generateInvoicePDF, toInvoiceDataProps } from '../../lib/generateInvoicePDF'
import { TextArea } from '../../components/atoms/TextArea'
import CheckableUsersTable from '../../components/molecules/CheckableUsersTable'

export type CheckUsersAndCommentModalProps = {
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
  onClickCreateApprovalRequest: (comment: string, requestReceiverIds: string[]) => Promise<void>
}

const CheckUsersAndCommentModal: React.VFC<CheckUsersAndCommentModalProps> = ({
  users,
  isOpen,
  onClose,
  onClickCreateApprovalRequest,
}: CheckUsersAndCommentModalProps) => {
  const [comment, setComment] = useState<string>('')
  const onChangeComment: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => {
    setComment(e.currentTarget.value)
  }, [])

  const [checkedUsers, setCheckedUsers] = useState(new Set<string>())

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>承認リクエストを送信する</ModalHeader>
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
              onClickCreateApprovalRequest(comment, Array.from(checkedUsers))
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

const InvoiceDetailPage: React.VFC = () => {
  const navigate = useNavigate()
  const invoiceId = useParams().invoiceId ?? ''

  const toast = useToast()

  // for request create modal
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { loading, error, data } = useInvoiceIdQuery({ variables: { id: invoiceId } })

  const [createApprovalRequet] = useInvoiceIdCreateApprovalRequestMutation({
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
  const invoiceData = toInvoiceDataProps(data)

  const doc = generateInvoicePDF(invoiceData)

  const onClickCreateApprovalRequest = async (comment: string, requestReceiverIds: string[]) => {
    const result = await createApprovalRequet({
      variables: {
        newRequest: {
          comment,
          invoiceId,
          requestReceiverIds,
          requesterId: '1', // dummy id; TODO: 認証系が実装されたら対応
        },
      },
    })
    console.log(result)
  }

  // 表示するボタン, パラメータを制御する処理
  // TODO: 他のstatusに対応する処理
  let buttons
  if (data.getInvoice.status === 'notRequested') {
    buttons = (
      <HStack>
        <PrimaryButton onClick={onOpen}>受領する</PrimaryButton>
        <PrimaryButton onClick={() => console.log('差戻')}>差し戻す</PrimaryButton>
        <CheckUsersAndCommentModal
          users={data.users}
          isOpen={isOpen}
          onClose={onClose}
          onClickCreateApprovalRequest={onClickCreateApprovalRequest}
        />
      </HStack>
    )
  } else {
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
  }

  let constructionName, receiptName, approvalName1, approvalName2
  if (data.getInvoice.status === 'notRequested') {
    constructionName = data.getInvoice.construction?.name || ''
    receiptName = `${data.getInvoice.createdBy.familyName} ${data.getInvoice.createdBy.givenName}`
    approvalName1 = ''
    approvalName2 = ''
  } else {
    constructionName = ''
    receiptName = ''
    approvalName1 = ''
    approvalName2 = ''
  }

  return (
    <LoginTemplate>
      <InvoicePDF doc={doc} />
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
      <Box bg="white" p={4}>
        {buttons}
      </Box>
    </LoginTemplate>
  )
}

export default InvoiceDetailPage
