import { Box, Button, useToast, Wrap, WrapItem, Flex } from '@chakra-ui/react'
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
import InvoicePDF from '../../components/molecules/InvoicePDF'
import { toInvoiceDataProps, generateInvoicePDF } from '../../lib/generateInvoicePDF'
import { MdSave, MdCheckCircle } from 'react-icons/md'
import { mutationOptionsWithMsg } from '../../utils'

function toEditorElements(data: IssueIdQuery): EditorElement[] {
  const { body, invoiceFormatLog } = data.invoice
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

  const invoiceData = toInvoiceDataProps(data)
  const [doc, setDoc] = useState(generateInvoicePDF(invoiceData))

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
          id: data.invoice.id,
          body: inputBody,
        },
      },
    })
    console.log(result, body)

    const idToValue: Record<string, string> = Object.fromEntries(
      body.filter((elm) => elm.value != null).map(({ id, value }) => [id, value || '']),
    )

    const updatedData: IssueIdQuery = {
      ...data,
      invoice: {
        ...data.invoice,
        body: data.invoice.body
          .filter((elm) => idToValue[elm.elementId] != null)
          .map((elm) => ({ ...elm, value: idToValue[elm.elementId] ?? '' })),
      },
    }
    setDoc(generateInvoicePDF(toInvoiceDataProps(updatedData)))
  }

  return (
    <Flex>
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
      <Box flex="1">
        <InvoicePDF doc={doc} />
      </Box>
    </Flex>
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

  return (
    <LoginTemplate currentUser={data?.currentUser}>
      {data && <_NewInvoiceDetailPage data={data} />}
    </LoginTemplate>
  )
}

export default NewInvoiceDetailPage
