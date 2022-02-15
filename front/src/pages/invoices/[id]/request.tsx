import { Box, Heading, HStack, Stack, useToast } from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import { PrimaryButton } from '../../../components/atoms/Buttons'
import { TextArea } from '../../../components/atoms/TextArea'
import InvoiceSteps from '../../../components/molecules/InvoiceSteps'
import LoginTemplate from '../../../components/templates/LoginTemplate'
import { useCreateRequestMutation, useRequestSendQuery } from '../../../generated/graphql'
import CheckableUsersTable from '../../../components/molecules/CheckableUsersTable'

const errorMessageTranslation: Record<string, string> = {
  'receiver cannot be requester': 'リクエストをした人に承認リクエストを送り返すことはできません。',
  'has duplicate elements in request_receiver_ids': '申請先に同じ人が重複して含まれています。',
  'status of request is not requesting but approved': 'このリクエストは既に承認済みです。',
  'status of request is not requesting but declined': 'このリクエストは既に不承認となっています。',
}

const RequestSendPage: React.VFC = () => {
  const toast = useToast()
  const [comment, setComment] = useState('')
  const onChangeComment: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => {
    setComment(e.currentTarget.value)
  }, [])

  const { error, data } = useRequestSendQuery()
  if (error) {
    console.error(error)
  }

  const [createRequest] = useCreateRequestMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onCompleted(data: any) {
      toast({
        description: JSON.stringify(data),
        status: 'success',
        position: 'top',
        isClosable: true,
      })
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(err: { message: string }) {
      toast({
        description: errorMessageTranslation[err.message] ?? err.message,
        status: 'error',
        position: 'top',
        isClosable: true,
      })
    },
  })

  const [checkedUsers, setCheckedUsers] = useState<Set<number>>(new Set())

  const onClickRequestSend = async () => {
    const result = await createRequest({
      variables: {
        newRequest: {
          comment,
          invoice_id: '0e5cdeb1-a4e3-4407-b33e-88cf5dbec2ea',
          request_receiver_ids: Array.from(checkedUsers),
          requester_id: 1,
        },
      },
    })
    console.log(result, checkedUsers)
  }

  return (
    <LoginTemplate>
      <Box bg="white" p={4}>
        <InvoiceSteps />
      </Box>
      <Stack bg="white" p={4}>
        {data && (
          <>
            <Heading as="h3" size="md">
              申請先
            </Heading>
            {/* TODO: UsersTableにRequestを送る側を表示するべきじゃない */}
            <CheckableUsersTable
              users={data.users}
              checkedUsers={checkedUsers}
              setCheckedUsers={setCheckedUsers}
            />
          </>
        )}
      </Stack>
      <Box bg="white" p={4}>
        <Stack>
          <TextArea placeholder="コメント" value={comment} onChange={onChangeComment} />
          <HStack>
            <PrimaryButton onClick={() => onClickRequestSend()}>承認リクエストを送信</PrimaryButton>
          </HStack>
        </Stack>
      </Box>
    </LoginTemplate>
  )
}

export default RequestSendPage
