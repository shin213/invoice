import { Stack, Heading, Box } from '@chakra-ui/react'
import React from 'react'
import CompaniesTable from '../components/organisms/CompaniesTable'
import LoginTemplate from '../components/templates/LoginTemplate'
import { useCompaniesQuery } from '../generated/graphql'

const CompaniesPage: React.VFC = () => {
  const { data, error } = useCompaniesQuery()
  if (error) {
    console.error(error)
  }
  return (
    <LoginTemplate>
      <Stack>
        <Heading as="h1" size="md" textAlign="center">
          企業一覧
        </Heading>
        {data && (
          <Box bg="white" p={4} borderRadius="md" shadow="md">
            <CompaniesTable companies={data.companies} />
          </Box>
        )}
      </Stack>
    </LoginTemplate>
  )
}

export default CompaniesPage
