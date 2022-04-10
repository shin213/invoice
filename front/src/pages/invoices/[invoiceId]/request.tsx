import { Box, Heading, HStack, Stack, useToast } from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import { PrimaryButton } from '../../../components/atoms/Buttons'
import { TextArea } from '../../../components/atoms/TextArea'
import DummyInvoiceSteps from '../../../components/molecules/DummyInvoiceSteps'
import LoginTemplate from '../../../components/templates/LoginTemplate'
import {
  useInvoicesIdRequestCreateRequestMutation,
  useInvoicesIdRequestQuery,
} from '../../../generated/graphql'
import CheckableUsersTable from '../../../components/molecules/CheckableUsersTable'
import { mutationOptionsWithMsg } from '../../../utils'

// const errorMessageTranslation = (err: GraphQLError) => {
//   if (err.extensions.code === StatusCodes.CONFLICT) {
//     return '通信に失敗しました。もう一度リクエストをお願いします。'
//   }
//   const _errorMessageTranslation: Record<string, string> = {
//     'receiver cannot be requester':
//       'リクエストをした人に承認リクエストを送り返すことはできません。',
//     'has duplicate elements in request_receiver_ids': '申請先に同じ人が重複して含まれています。',
//     // TODO: これらは承認時のエラーメッセージなのでここには置かないべき
//     // 'status of request is not requesting but approved': 'このリクエストは既に承認済みです。',
//     // 'status of request is not requesting but declined':
//     //   'このリクエストは既に不承認となっています。',
//   }
//   const msg = _errorMessageTranslation[err.message]
//   if (msg === undefined) {
//     console.error(JSON.stringify(err))
//   }
//   return msg ?? '何らかのエラーが発生しました。'
// }

const RequestSendPage: React.VFC = () => {
  const toast = useToast()
  const [comment, setComment] = useState('')
  const onChangeComment: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => {
    setComment(e.currentTarget.value)
  }, [])

  const { error, data } = useInvoicesIdRequestQuery({ fetchPolicy: 'no-cache' })
  if (error) {
    console.error(error)
  }

  const [createRequest] = useInvoicesIdRequestCreateRequestMutation(
    mutationOptionsWithMsg(toast, 'リクエストを作成しました。'),
  )

  const [checkedUsers, setCheckedUsers] = useState<Set<string>>(new Set())

  const onClickRequestSend = async () => {
    const result = await createRequest({
      variables: {
        newRequest: {
          comment,
          invoiceId: '0e5cdeb1-a4e3-4407-b33e-88cf5dbec2ea',
          requestReceiverIds: Array.from(checkedUsers),
          requesterId: '1',
        },
      },
    })
    console.log(result, checkedUsers)
  }

  return (
    <LoginTemplate currentUser={data?.currentUser}>
      <Box bg="white" p={4}>
        <DummyInvoiceSteps />
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
