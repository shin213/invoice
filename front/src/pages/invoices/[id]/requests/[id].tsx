import React, { useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoginTemplate from '../../../../components/templates/LoginTemplate'
import { useGetRequestQuery } from '../../../../generated/graphql'
import CommentsTree from '../../../../components/molecules/CommentsTree'
import { Stack, Box, HStack, Heading } from '@chakra-ui/react'
import { PrimaryButton, SecondaryButton } from '../../../../components/atoms/Buttons'
import { TextArea } from '../../../../components/atoms/TextArea'

const RequestDetailPage: React.VFC = () => {
  const { req_id } = useParams()
  const id = parseInt(req_id || '-1')

  const { data, error } = useGetRequestQuery({ variables: { id } })
  if (error) {
    console.error(error)
  }

  const [comment, setComment] = useState('')
  const onChangeComment: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => {
    setComment(e.currentTarget.value)
  }, [])

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
            <PrimaryButton>コメントを追加</PrimaryButton>
            <SecondaryButton>リクエストを承認</SecondaryButton>
          </HStack>
        </Stack>
      </Box>
    </LoginTemplate>
  )
}

export default RequestDetailPage
