import { Box, Button, useToast, Wrap, WrapItem } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  InvoiceLogElementInput,
  IssueIdQuery,
  useIssueIdQuery,
  useIssueIdUpdateInvoiceMutation,
} from '../../generated/graphql'
import LoginTemplate from '../../components/templates/LoginTemplate'
import NewInvoiceEditor, { EditorElement } from '../../components/molecules/NewInvoiceEditor'
import { MdSave, MdCheckCircle } from 'react-icons/md'
import { mutationOptionsWithMsg } from '../../utils'

function toEditorElements(data: IssueIdQuery): EditorElement[] {
  const { body, invoiceFormatLog } = data.getInvoice
  const vals = Object.fromEntries(body.map((element) => [element.elementId, element.value]))
  const editorElements: EditorElement[] = invoiceFormatLog.elements.map((element) => ({
    id: element.id,
    order: element.order,
    label: element.label,
    value: vals[element.id],
    valueType: element.valueType,
    own: element.own,
  }))
  return editorElements
}

type _NewInvoiceDetailPageProps = {
  data: IssueIdQuery
}

const _NewInvoiceDetailPage: React.VFC<_NewInvoiceDetailPageProps> = ({
  data,
}: _NewInvoiceDetailPageProps) => {
  const navigate = useNavigate()
  const toast = useToast()

  const elements = toEditorElements(data)
  const [body, setBody] = useState<EditorElement[]>(elements)

  const [updateInvoiceLog] = useIssueIdUpdateInvoiceMutation(
    mutationOptionsWithMsg(toast, '更新しました。'),
  )

  const onClickSave = async () => {
    const inputBody: InvoiceLogElementInput[] = body
      .filter((elm) => elm.value != null)
      .map((elm) => ({
        elementId: elm.id,
        value: elm.value || '',
      }))
    const result = await updateInvoiceLog({
      variables: {
        input: {
          id: data.getInvoice.id,
          body: inputBody,
        },
      },
    })
    console.log(result, body)
  }

  return (
    <Box bg="white" p={4}>
      <NewInvoiceEditor body={body} setBody={setBody} />
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
  )
}

const NewInvoiceDetailPage: React.VFC = () => {
  const { invoiceId } = useParams()
  const { error, data } = useIssueIdQuery({
    variables: { id: invoiceId || '' },
    fetchPolicy: 'no-cache',
  })
  if (error) {
    console.error(error)
  }

  return <LoginTemplate>{data && <_NewInvoiceDetailPage data={data} />}</LoginTemplate>
}

export default NewInvoiceDetailPage
