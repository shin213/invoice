import { Box, Button, useToast, Wrap, WrapItem } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  InvoiceLogElementInput,
  InvoiceLogQuery,
  useInvoiceLogQuery,
  useUpdateInvoiceLogMutation,
} from '../../generated/graphql'
import LoginTemplate from '../../components/templates/LoginTemplate'
import NewInvoiceEditor, { EditorElement } from '../../components/molecules/NewInvoiceEditor'
import { MdSave, MdCheckCircle } from 'react-icons/md'

function toEditorElements(data: InvoiceLogQuery): EditorElement[] {
  const { body, invoiceFormatLog } = data.getInvoiceLog
  const vals = Object.fromEntries(body.map((element) => [element.elementId, element.value]))
  const editorElements: EditorElement[] = invoiceFormatLog.elements.map((element) => ({
    id: element.id,
    order: element.order,
    label: element.label,
    value: vals[element.id],
    own: element.own,
  }))
  return editorElements
}

const NewInvoiceDetailPage: React.VFC = () => {
  const toast = useToast()
  const navigate = useNavigate()

  const { id } = useParams()
  const { error, data } = useInvoiceLogQuery({ variables: { id: id || '' } })
  if (error) {
    console.error(error)
  }

  const [body, setBody] = useState<EditorElement[]>([])

  // TODO: 何とかする（レンダリングのタイミングが悪い）
  const initFlag = useRef(false)
  const initBody = data ? toEditorElements(data) : []
  if (!initFlag.current && initBody.length > 0) {
    initFlag.current = true
    body.push(...initBody)
    setBody(initBody)
  }

  const [updateInvoiceLog] = useUpdateInvoiceLogMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onCompleted(data: any) {
      toast({
        description: JSON.stringify(data),
        status: 'success',
        position: 'top',
        isClosable: true,
      })
    },
    onError(err) {
      const messages = err.graphQLErrors.map((e) => e.message)
      if (messages.length > 1) {
        console.error(messages)
      } else if (messages.length === 0) {
        console.error('messages.length === 0')
        messages.push('不明なエラーが発生しました。')
      }
      toast({
        description: messages[0],
        status: 'error',
        position: 'top',
        isClosable: true,
      })
    },
  })

  const onClickSave = async () => {
    const inputBody: InvoiceLogElementInput[] = body.map((elm) => ({
      elementId: elm.id,
      value: elm.value || '',
    }))
    const result = await updateInvoiceLog({
      variables: {
        input: {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          id: data!.getInvoiceLog.id,
          body: inputBody,
        },
      },
    })
    console.log(result, body)
  }

  return (
    <LoginTemplate>
      {data && (
        <Box bg="white" p={4}>
          <NewInvoiceEditor elements={toEditorElements(data)} body={body} setBody={setBody} />
          <Box bg="white" p={2} />
          <Wrap spacing="30px" align="center" justify="right">
            <WrapItem>
              <Button bgColor="cyan.500" color="white" onClick={() => onClickSave()}>
                <MdSave title="保存" />
                <Box p="2">保存</Box>
              </Button>
            </WrapItem>
            <WrapItem>
              <Button
                bgColor="teal.400"
                color="white"
                onClick={() => navigate('view', { state: { body } })}
              >
                <MdCheckCircle title="確認" />
                <Box p="2">確認</Box>
              </Button>
            </WrapItem>
          </Wrap>
        </Box>
      )}
    </LoginTemplate>
  )
}

export default NewInvoiceDetailPage
