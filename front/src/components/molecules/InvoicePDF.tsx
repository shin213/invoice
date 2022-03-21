import { AspectRatio, Box } from '@chakra-ui/react'
import jspdf from 'jspdf'
import React from 'react'

export type InvoicePDFProps = {
  doc: jspdf
}

const invoicePDF: React.VFC<InvoicePDFProps> = ({ doc }: InvoicePDFProps) => (
  <AspectRatio ratio={4 / 3}>
    <Box bg="white" p={4} width="100%">
      <iframe width="100%" height="100%" src={doc.output('datauristring')}></iframe>
    </Box>
  </AspectRatio>
)

export default invoicePDF
