import { Box } from '@chakra-ui/react'
import jspdf from 'jspdf'
import React from 'react'

export type InvoicePDFProps = {
  doc: jspdf
}

const _invoicePDF: React.VFC<InvoicePDFProps> = ({ doc }: InvoicePDFProps) => (
  <Box bg="white" p={4} width="100%" height="100%">
    <iframe width="100%" height="100%" src={doc.output('datauristring')}></iframe>
  </Box>
)

const invoicePDF = React.memo(_invoicePDF)

export default invoicePDF
