import { Divider, Stack, Text, Heading, HStack } from '@chakra-ui/react'
import React from 'react'

type CommentProp = {
  __typename?: unknown
  id: number
  content: string
  user: {
    id: string
    familyName: string
    givenName: string
  }
}

export type CommentsTreeProps = {
  comments: CommentProp[]
}

const CommentsTree: React.VFC<CommentsTreeProps> = ({ comments }: CommentsTreeProps) => (
  <Stack p={4}>
    {comments.map((comment) => (
      <Stack key={comment.id} border="1px" borderColor="gray.200" p={4}>
        <HStack>
          <Heading as="h3" size="md">
            {`${comment.user.familyName} ${comment.user.givenName}`}
          </Heading>
        </HStack>
        <Divider orientation="horizontal" />
        <Text>{comment.content}</Text>
      </Stack>
    ))}
  </Stack>
)

export default CommentsTree
