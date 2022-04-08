import { Stack, Heading, Box } from '@chakra-ui/react'
import React from 'react'
import UsersTable from '../components/molecules/UsersTable'
import LoginTemplate from '../components/templates/LoginTemplate'
import { useSettingsQuery } from '../generated/graphql'

const RequestsPage: React.VFC = () => {
  const { error, data } = useSettingsQuery({ fetchPolicy: 'no-cache' })

  if (error) {
    console.error(error)
  }

  return (
    <LoginTemplate currentUser={data?.currentUser}>
      <Stack>
        <Heading as="h1" size="md" textAlign="center">
          ユーザー権限管理
        </Heading>
        {data && (
          <Box bg="white" p={4} borderRadius="md" shadow="md">
            <UsersTable users={data.users} />
          </Box>
        )}
      </Stack>
    </LoginTemplate>
  )
}

export default RequestsPage
