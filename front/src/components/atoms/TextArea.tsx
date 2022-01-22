import { Textarea, TextareaProps } from '@chakra-ui/react'
import ResizeTextarea from 'react-textarea-autosize'
import React from 'react'

// eslint-disable-next-line react/display-name
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => (
  <Textarea
    minH="unset"
    overflow="hidden"
    w="100%"
    resize="none"
    ref={ref}
    minRows={1}
    as={ResizeTextarea}
    {...props}
  />
))
