import React, { useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Stack, Box, HStack, Heading, useToast } from '@chakra-ui/react'
import LoginTemplate from '../../../../components/templates/LoginTemplate'
import { useGetRequestQuery, useCreateJudgementMutation } from '../../../../generated/graphql'
import CommentsTree from '../../../../components/molecules/CommentsTree'
import { PrimaryButton, SecondaryButton } from '../../../../components/atoms/Buttons'
import { TextArea } from '../../../../components/atoms/TextArea'

const RequestDetailPage: React.VFC = () => {
  const { requestId } = useParams()
  const id = parseInt(requestId || '-1')

  const { data, error } = useGetRequestQuery({ variables: { id } })
  if (error) {
    console.error(error)
  }

  const [comment, setComment] = useState('')
  const onChangeComment: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => {
    setComment(e.currentTarget.value)
  }, [])

  const toast = useToast()
  const [createJudgement] = useCreateJudgementMutation({
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

  const onClickJudgement = async () => {
    const result = await createJudgement({
      variables: {
        newJudgement: {
          comment,
          requestId: id,
          userId: 1, // TODO: user_idが決め打ちになっている
          type: 'approve',
        },
      },
    })
    console.log(result)
  }

  return (
    <LoginTemplate>
      <Box bg="white" p={4}>
        <Heading as="h3" size="md">
          リクエストへのコメント
        </Heading>
      </Box>
      <Stack bg="white" p={4}>
        {data && <CommentsTree comments={data.getRequest.comments}></CommentsTree>}
      </Stack>
      <Box bg="white" p={4}>
        <Stack>
          <TextArea placeholder="コメント" value={comment} onChange={onChangeComment} />
          <HStack>
            {/* TODO: addCommentを用いたコメント追加ボタンの動作の記述 */}
            <PrimaryButton>コメントを追加</PrimaryButton>
            <SecondaryButton onClick={() => onClickJudgement()}>リクエストを承認</SecondaryButton>
          </HStack>
        </Stack>
      </Box>
    </LoginTemplate>
  )
}

export default RequestDetailPage
