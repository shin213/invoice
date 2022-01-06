import { Box, useColorModeValue } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

const LogoutTemplate = ({
  children,
}: {
    children: ReactNode
  }) => (
  <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
    <Box ml={{ base: 0, md: 60 }} p="4">
      {children}
    </Box>
  </Box>
)

export default LogoutTemplate
