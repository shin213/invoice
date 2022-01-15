import { Flex, Stack, Heading, Text, useColorModeValue, Avatar } from '@chakra-ui/react'
import React from 'react'

export type UserListCardProps = {
  name: string
  email: string
}

const UserListCard: React.VFC<UserListCardProps> = ({ name, email }: UserListCardProps) => (
  <Stack
    borderWidth="1px"
    borderRadius="lg"
    w={{ sm: '100%', md: '540px' }}
    height="120px"
    direction={{ base: 'column', md: 'row' }}
    bg={useColorModeValue('white', 'gray.900')}
    boxShadow={'2xl'}
    padding={4}
  >
    <Flex flex={1} justifyContent="center" alignItems="center">
      <Avatar
        // height="90%"
        size={'xl'}
        src={
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
        }
        alt={'Author'}
        css={{
          border: '2px solid white',
        }}
      />
    </Flex>
    <Stack flex={1} flexDirection="column" justifyContent="center" alignItems="center" p={1} pt={2}>
      <Heading fontSize={'2xl'} fontFamily={'body'}>
        {name}
      </Heading>
    </Stack>
    <Stack flex={1} flexDirection="column" justifyContent="center" alignItems="center" p={1} pt={2}>
      <Text fontWeight={600} color={'gray.500'} size="sm">
        {email}
      </Text>
    </Stack>
  </Stack>
)

export default UserListCard
