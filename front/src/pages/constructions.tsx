import { Stack, Heading } from '@chakra-ui/react'
import React from 'react'
import LoginTemplate from '../components/templates/LoginTemplate'

const ConstructionsPage: React.VFC = () => {
  return (
    <LoginTemplate>
      <Stack>
        <Heading as="h1" size="md" textAlign="center">
          工事一覧
        </Heading>
      </Stack>
    </LoginTemplate>
  )
}

export default ConstructionsPage
