import { ApolloCache, DefaultContext, MutationHookOptions } from '@apollo/client'
import { useToast } from '@chakra-ui/react'

export function unreachable(...t: never): never {
  throw new Error(`unreachable ${JSON.stringify(t)}`)
}

export function checkProperty(obj: unknown, propName: string | number): unknown {
  if (obj instanceof Object && propName in obj) {
    return (obj as { [key: string]: unknown })[propName]
  }
  return undefined
}

export function mutationOptions<T, U>(
  toast: ReturnType<typeof useToast>,
  onCompleted: () => void,
  errorMessageTranslation: Record<string, string> = {},
): MutationHookOptions<T, U, DefaultContext, ApolloCache<unknown>> {
  return {
    onCompleted,
    onError(err) {
      console.error(err)
      const messages = err.graphQLErrors.map((e) => e.message)
      if (messages.length > 1) {
        console.error(messages)
      } else if (messages.length === 0) {
        console.error('messages.length === 0')
        messages.push('不明なエラーが発生しました。')
      }
      toast({
        description: errorMessageTranslation[messages[0] ?? ''] || '不明なエラーです。',
        status: 'error',
        position: 'top',
        isClosable: true,
      })
    },
  }
}

export function mutationOptionsWithMsg<T, U>(
  toast: ReturnType<typeof useToast>,
  message: string,
  errorMessageTranslation: Record<string, string> = {},
  handleRefetch?: () => Promise<void>,
): MutationHookOptions<T, U, DefaultContext, ApolloCache<unknown>> {
  return mutationOptions(
    toast,
    async () => {
      if (handleRefetch !== undefined) {
        await handleRefetch()
      }
      toast({
        description: message,
        status: 'success',
        position: 'top',
        isClosable: true,
      })
    },
    errorMessageTranslation,
  )
}
