import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Flex, Box, Heading, Divider, Stack } from '@chakra-ui/react'
import { PrimaryButton } from '../components/atoms/Buttons'
import { Auth } from 'aws-amplify'

export const SignInPage: React.VFC = () => {
  const navigate = useNavigate()

  const onSignInSubmit: React.MouseEventHandler<HTMLButtonElement> = useCallback(async (e) => {
    e.preventDefault()
    await Auth.federatedSignIn()
    console.log(await Auth.currentAuthenticatedUser())
    // await Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google})
    navigate('/')
  }, [])
  // Ex: #access_token=jwt_token&token_type=Bearer&expires_in=3600
  // if (location.hash && location.hash.split('&')[0]) {

  //   navigate('/')
  // }

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          Invoice Admin
        </Heading>
        <Divider my={4} />
        <Stack spacing={6} py={4} px={10}>
          {/* <Link as={ReactRouterLink} to={loginLink} style={{ textDecoration: 'none' }}> */}
          <PrimaryButton onClick={onSignInSubmit}>ログイン</PrimaryButton>
          {/* </Link> */}
        </Stack>
      </Box>
    </Flex>
  )
}
