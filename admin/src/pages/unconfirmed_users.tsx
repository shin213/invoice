import { Box, Heading, Stack, useToast } from '@chakra-ui/react'
import React from 'react'
import UsersTable from '../components/organisms/unconfirmed_users/UsersTable'
import LoginTemplate from '../components/templates/LoginTemplate'
import { useUnconfirmedUsersQuery, useCreateUnconfirmedUserMutation } from '../generated/graphql'
import { mutationOptions } from '../utils'

const UnconfirmedUsersPage: React.VFC = () => {
  const toast = useToast()
  const { data, error } = useUnconfirmedUsersQuery({ fetchPolicy: 'no-cache' })
  if (error) {
    console.error(error)
  }
  const [createUnconfirmedUser] = useCreateUnconfirmedUserMutation(
    mutationOptions(toast, 'ユーザーを作成しました。'),
  )
  return (
    <LoginTemplate>
      <Stack>
        <Heading as="h1" size="md" textAlign="center">
          仮ユーザー一覧
        </Heading>
        {data && (
          <Box bg="white" p={4} borderRadius="md" shadow="md">
            <UsersTable
              unconfirmedUsers={data.unconfirmedUsers}
              companies={data.companies}
              createUnconfirmedUser={createUnconfirmedUser}
            />
          </Box>
        )}
      </Stack>
    </LoginTemplate>
  )
}

export default UnconfirmedUsersPage
