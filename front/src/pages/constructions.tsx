import { Stack, Heading, Box, useToast } from '@chakra-ui/react'
import React from 'react'
import ConstructionsTable from '../components/organisms/constructions/ConstuctionsTable'
import LoginTemplate from '../components/templates/LoginTemplate'
import { useConstructionsQuery, useCreateConstructionMutation } from '../generated/graphql'
import { mutationOptionsWithMsg } from '../utils'

const ConstructionsPage: React.VFC = () => {
  const toast = useToast()
  const { data, error } = useConstructionsQuery({ fetchPolicy: 'no-cache' })
  if (error) {
    console.error(error)
  }
  const [createConstruction] = useCreateConstructionMutation(
    mutationOptionsWithMsg(toast, '工事を登録しました。'),
  )
  return (
    <LoginTemplate>
      <Stack>
        <Heading as="h1" size="md" textAlign="center">
          工事一覧
        </Heading>
        {data && (
          <Box bg="white" p={4} borderRadius="md" shadow="md">
            <ConstructionsTable
              constructions={data.constructions}
              createConstruction={createConstruction}
              users={data.users}
            />
          </Box>
        )}
      </Stack>
    </LoginTemplate>
  )
}

export default ConstructionsPage
