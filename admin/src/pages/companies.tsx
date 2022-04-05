import { Stack, Heading, Box, useToast } from '@chakra-ui/react'
import React from 'react'
import CompaniesTable from '../components/organisms/companies/CompaniesTable'
import LoginTemplate from '../components/templates/LoginTemplate'
import { useCompaniesQuery, useCreateCompanyMutation } from '../generated/graphql'
import { mutationOptions } from '../utils'

const CompaniesPage: React.VFC = () => {
  const toast = useToast()
  const { data, error } = useCompaniesQuery({ fetchPolicy: 'no-cache' })
  if (error) {
    console.error(error)
  }
  const [createCompany] = useCreateCompanyMutation(mutationOptions(toast, '企業を作成しました。'))
  return (
    <LoginTemplate>
      <Stack>
        <Heading as="h1" size="md" textAlign="center">
          企業一覧
        </Heading>
        {data && (
          <Box bg="white" p={4} borderRadius="md" shadow="md">
            <CompaniesTable companies={data.adminCompanies} createCompany={createCompany} />
          </Box>
        )}
      </Stack>
    </LoginTemplate>
  )
}

export default CompaniesPage
