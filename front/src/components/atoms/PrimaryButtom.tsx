import { Button, ButtonProps } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

type Props = ButtonProps & {
  children: ReactNode
}

export const PrimaryButton: React.VFC<Props> = (props: Props) => {
  const { children } = props
  return (
    <Button bg="cyan.400" color="white" _hover={{ opacity: 0.8 }} {...props}>
      {children}
    </Button>
  )
}
