import { Button, ButtonProps } from '@chakra-ui/react'
import React from 'react'

export const PrimaryButton: React.VFC<ButtonProps> = (props: ButtonProps) => {
  const { children } = props
  return (
    <Button bg="primary.500" color="white" _hover={{ opacity: 0.8 }} {...props}>
      {children}
    </Button>
  )
}

export const SecondaryButton: React.VFC<ButtonProps> = (props: ButtonProps) => {
  const { children } = props
  return (
    <Button bg="teal.400" color="white" _hover={{ opacity: 0.8 }} {...props}>
      {children}
    </Button>
  )
}

export const ErrorButton: React.VFC<ButtonProps> = (props: ButtonProps) => {
  const { children } = props
  return (
    <Button bg="red.400" color="white" _hover={{ opacity: 0.8 }} {...props}>
      {children}
    </Button>
  )
}
