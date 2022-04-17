import { Stack, Heading, Box } from '@chakra-ui/react'
import React from 'react'
import ConstructionsTable from '../components/molecules/ConstuctionsTable'
import LoginTemplate from '../components/templates/LoginTemplate'
import { useConstructionsQuery } from '../generated/graphql'

const ConstructionsPage: React.VFC = () => {
  const { data, error } = useConstructionsQuery({ fetchPolicy: 'no-cache' })
  if (error) {
    console.error(error)
  }
  return (
    <LoginTemplate>
      <Stack>
        <Heading as="h1" size="md" textAlign="center">
          工事一覧
        </Heading>
        {data && (
          <Box bg="white" p={4} borderRadius="md" shadow="md">
            <ConstructionsTable constructions={data.constructions} />
          </Box>
        )}
      </Stack>
    </LoginTemplate>
  )
}

export default ConstructionsPage
