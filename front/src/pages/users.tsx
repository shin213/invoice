import { Box, Heading, Stack, useToast } from '@chakra-ui/react'
import React from 'react'
import UsersManagementTable from '../components/organisms/users/UsersManagementTable'
import LoginTemplate from '../components/templates/LoginTemplate'
import { useUnconfirmedUsersQuery, useCreateUnconfirmedUserMutation } from '../generated/graphql'
import { mutationOptionsWithMsg } from '../utils'

const UsersPage: React.VFC = () => {
  const toast = useToast()
  const { data, error } = useUnconfirmedUsersQuery({ fetchPolicy: 'no-cache' })
  if (error) {
    console.error(error)
  }
  const [createUnconfirmedUser] = useCreateUnconfirmedUserMutation(
    mutationOptionsWithMsg(toast, 'ユーザーを作成しました。'),
  )
  return (
    <LoginTemplate>
      <Stack>
        <Heading as="h1" size="md" textAlign="center">
          仮ユーザー一覧
        </Heading>
        {data && (
          <Box bg="white" p={4} borderRadius="md" shadow="md">
            <UsersManagementTable
              unconfirmedUsers={data.unconfirmedUsers}
              createUnconfirmedUser={createUnconfirmedUser}
            />
          </Box>
        )}
      </Stack>
    </LoginTemplate>
  )
}

export default UsersPage
