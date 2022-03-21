import { jsPDF } from 'jspdf'
import { sourceHanSerifFont } from './SourceHanSerifJP-VF'
import { InvoicePdfQuery } from '../generated/graphql'

type transactionOverviewTableProps = {
  transactionName: string
  constructionPeriod: string
  orderNumber: string
}

type mainBillingTableProps = {
  billingAmountIncludingTax: string
  thisMonthAmountExcludingTax: string
  consumptionTax: string
}

type subBillingTableProps = {
  contractAmountIncludingTax: string
  cumulativeBillingAmountUntilLastTimeIncludingTax: string
  cumulativeBillingAmountUntilCurrentTimeIncludingTax: string
}

type companyInformationTableProps = {
  companyReferenceCode: string
  companyName: string
  companyPostalCode: string
  companyAddress: string
  phoneNumber: string
  personInCharge: string
}

type invoiceDetailTableProps = {
  header: string[]
  items: string[][]
}

type invoiceDataProps = {
  invoiceTitleFirstPage: string
  recipientCompany: string
  constructionName: string
  submitDate: string
  companyReferenceNumber: string
  transactionOverviewTable: transactionOverviewTableProps
  mainBillingTable: mainBillingTableProps
  subBillingTable: subBillingTableProps
  terminationSettlementAmount: string
  billingCount: string
  completionState: string
  companyInformationTable: companyInformationTableProps
  invoiceTitleSecondPage: string
  invoiceDetailTable: invoiceDetailTableProps
}

export const toInvoiceDataProps = (data: InvoicePdfQuery): invoiceDataProps => {
  const idToLabel: Record<string, string> = Object.fromEntries(
    data.getInvoiceLog.invoiceFormatLog.elements.map(({ id, label }) => [id, label]),
  )
  const labelToValue: Record<string, string> = Object.fromEntries(
    data.getInvoiceLog.body
      .filter(({ elementId }) => idToLabel[elementId] != null)
      .map(({ elementId, value }) => [idToLabel[elementId], value]),
  )

  const sortedDetailElements = [...data.getInvoiceLog.invoiceFormatLog.detailElements]
  sortedDetailElements.sort((e1, e2) => e1.order - e2.order)
  const invoiceDetailTableHeader = sortedDetailElements.map(({ label }) => label)
  const invoiceDetailTableItems = data.getInvoiceLog.detail.map((detailRow) => {
    const detailRowMap = Object.fromEntries(
      detailRow.map(({ elementId, value }) => [elementId, value]),
    )
    return sortedDetailElements.map(({ id }) => detailRowMap[id] ?? '')
  })

  // TODO: 「差引残額」「備考」の反映
  const invoiceData: invoiceDataProps = {
    invoiceTitleFirstPage: data.getInvoiceLog.invoiceFormatLog.invoiceFormat.name ?? '',
    recipientCompany: data.getInvoiceLog.invoiceFormatLog.invoiceFormat.company.name ?? '',
    constructionName: '燈ビル新築工事',
    submitDate: labelToValue['請求日'] ?? '',
    companyReferenceNumber: 'UMI20150303',
    transactionOverviewTable: {
      transactionName: '防水工事',
      constructionPeriod: '2020/12/04　～　2021/12/25',
      orderNumber: labelToValue['注文書番号'] ?? '',
    },
    mainBillingTable: {
      billingAmountIncludingTax: `￥${labelToValue['今回請求金額（税込）'] ?? ''}`,
      thisMonthAmountExcludingTax: `￥${labelToValue['今回請求額'] ?? ''}`,
      consumptionTax: '￥4,105',
    },
    subBillingTable: {
      contractAmountIncludingTax: `￥${labelToValue['注文契約額'] ?? ''}`,
      cumulativeBillingAmountUntilLastTimeIncludingTax: `￥${labelToValue['前回迄請求額'] ?? ''}`,
      cumulativeBillingAmountUntilCurrentTimeIncludingTax: `￥${labelToValue['請求累計額'] ?? ''}`,
    },
    terminationSettlementAmount: '',
    billingCount: '2',
    completionState: '',
    companyInformationTable: {
      companyReferenceCode: labelToValue['取引先コード'] ?? '',
      companyName: 'アカリ工務店',
      companyPostalCode: '〒113-0033',
      companyAddress: labelToValue['住所'] ?? '',
      phoneNumber: labelToValue['電話番号'] ?? '',
      personInCharge: labelToValue['氏名'] ?? '',
    },
    invoiceTitleSecondPage: '内訳明細書',
    invoiceDetailTable: {
      header: invoiceDetailTableHeader,
      items: invoiceDetailTableItems,
    },
  }
  return invoiceData
}

type fitTextInBoxHelperOptions = {
  fontSizeMax?: number
  horizontalAlign?: 'left' | 'center' | 'right'
  verticalAlign?: 'bottom' | 'middle' | 'top'
  margin?: number
}

const fitTextInBoxHelper = (
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  w: number,
  h: number,
  options?: fitTextInBoxHelperOptions,
) => {
  options = options ?? {}
  const fontSizeMax = options.fontSizeMax ?? Number.MAX_SAFE_INTEGER
  const horizontalAlign = options.horizontalAlign ?? 'left'
  const verticalAlign = options.verticalAlign ?? 'bottom'
  const margin = Math.min(options.margin ?? 0, w / 4, h / 4)

  const x1 = x + margin
  const x2 = x + w - margin
  const y1 = y + margin
  const y2 = y + h - margin

  let argX = x1
  if (horizontalAlign === 'left') {
    argX = x1
  } else if (horizontalAlign === 'center') {
    argX = (x1 + x2) / 2
  } else if (horizontalAlign === 'right') {
    argX = x2
  }

  let argY = y1
  if (verticalAlign === 'top') {
    argY = y1
  } else if (verticalAlign === 'middle') {
    argY = (y1 + y2) / 2
  } else if (verticalAlign === 'bottom') {
    argY = y2
  }

  const dim = doc.getTextDimensions(text)
  const currentFontSize = doc.getFontSize()
  const fitFontSize = Math.min(
    fontSizeMax,
    currentFontSize * ((x2 - x1) / dim.w),
    currentFontSize * ((y2 - y1) / dim.h),
  )

  doc.setFontSize(fitFontSize)
  doc.text(text, argX, argY, { align: horizontalAlign, baseline: verticalAlign })
  doc.setFontSize(currentFontSize)
}

const twoColumnTableHelper = (
  doc: jsPDF,
  xFirst: number,
  yFirst: number,
  wLeft: number,
  wRight: number,
  hList: number[],
  firstColumnContents: string[],
  secondColumnContents: string[],
  firstColumnOptions?: fitTextInBoxHelperOptions[],
  secondColumnOptions?: fitTextInBoxHelperOptions[],
  drawTableLine?: boolean,
) => {
  firstColumnOptions = firstColumnOptions ?? []
  secondColumnOptions = secondColumnOptions ?? []
  drawTableLine = drawTableLine ?? true

  const xMiddle = xFirst + wLeft
  const xLast = xMiddle + wRight
  const numberRows = hList.length

  const yList = [yFirst].concat(hList)
  for (let j = 0; j < numberRows; j++) {
    yList[j + 1] += yList[j] ?? 0
  }
  const yLast = yList[yList.length - 1] ?? 0

  if (drawTableLine) {
    doc.rect(xFirst, yFirst, xLast - xFirst, yLast - yFirst)

    for (const yElem of yList) {
      doc.line(xFirst, yElem, xLast, yElem)
    }

    doc.setLineDashPattern([1, 1], 0)
    doc.line(xMiddle, yFirst, xMiddle, yLast)
    doc.setLineDashPattern([], 0)
  }

  for (let j = 0; j < numberRows; j++) {
    const text = firstColumnContents[j] ?? ''
    const option = firstColumnOptions[j]
    const y = yList[j] ?? 0
    const h = hList[j] ?? 0
    fitTextInBoxHelper(doc, text, xFirst, y, wLeft, h, option)
  }

  for (let j = 0; j < numberRows; j++) {
    const text = secondColumnContents[j] ?? ''
    const option = secondColumnOptions[j]
    const y = yList[j] ?? 0
    const h = hList[j] ?? 0
    fitTextInBoxHelper(doc, text, xMiddle, y, wRight, h, option)
  }
}

const renderFirstPage = (doc: jsPDF, invoiceData: invoiceDataProps) => {
  const width = doc.internal.pageSize.getWidth()
  const height = doc.internal.pageSize.getHeight()
  const textMargin = 1

  const renderInvoiceTitle = (invoiceTitle: string) => {
    doc.setFontSize(20)
    doc.text(invoiceTitle, width * 0.5, height * 0.1, { align: 'center' })
  }

  const renderRecipientCompany = (recipientCompany: string) => {
    doc.setFontSize(12)
    doc.text(`${recipientCompany}` + '　御中', width * 0.07, height * 0.2)
  }

  const renderConstructionName = (constructionName: string) => {
    doc.setFontSize(10)
    doc.text('(工事名)', width * 0.05, height * 0.25)

    fitTextInBoxHelper(
      doc,
      constructionName,
      width * 0.05,
      height * 0.2,
      width * 0.55,
      height * 0.1,
      {
        fontSizeMax: 15,
        margin: textMargin,
      },
    )
    doc.line(width * 0.05, height * 0.3, width * 0.55, height * 0.3)
  }

  const renderSubmitDate = (submitDate: string) => {
    const keyText = '提出日　：'
    const valueText = submitDate

    doc.setFontSize(12)
    doc.text(keyText, width * 0.75, height * 0.3 - textMargin, {
      align: 'right',
      baseline: 'bottom',
    })
    doc.line(
      width * 0.75 - doc.getTextWidth(keyText) - textMargin,
      height * 0.3,
      width * 0.96,
      height * 0.3,
    )
    fitTextInBoxHelper(doc, valueText, width * 0.75, height * 0.25, width * 0.2, height * 0.05, {
      fontSizeMax: 15,
      horizontalAlign: 'center',
      verticalAlign: 'bottom',
      margin: textMargin,
    })
  }

  const renderCompanyReferenceNumber = (companyReferenceNumber: string) => {
    const keyText = '取引先照会No.　：'
    const valueText = companyReferenceNumber

    doc.text(keyText, width * 0.75, height * 0.35 - textMargin, {
      align: 'right',
      baseline: 'bottom',
    })
    doc.line(
      width * 0.75 - doc.getTextWidth(keyText) - textMargin,
      height * 0.35,
      width * 0.95,
      height * 0.35,
    )
    fitTextInBoxHelper(doc, valueText, width * 0.75, height * 0.3, width * 0.2, height * 0.05, {
      fontSizeMax: 15,
      horizontalAlign: 'right',
      verticalAlign: 'bottom',
      margin: textMargin,
    })
  }

  const renderTransactionOverviewTable = (
    transactionOverviewTable: transactionOverviewTableProps,
  ) => {
    const xFirst = width * 0.05
    const yFirst = height * 0.31
    const wLeft = width * 0.15
    const wRight = width * 0.3
    const hList = [height * 0.05, height * 0.05, height * 0.05]

    const firstColumnContents = ['取引件名', '納工期', '注文 No.']
    const secondColumnContents = [
      transactionOverviewTable.transactionName,
      transactionOverviewTable.constructionPeriod,
      transactionOverviewTable.orderNumber,
    ]

    const firstColumnOption: fitTextInBoxHelperOptions = {
      fontSizeMax: 15,
      horizontalAlign: 'center',
      verticalAlign: 'middle',
      margin: textMargin,
    }
    const firstColumnOptions: fitTextInBoxHelperOptions[] = Array(3).fill(firstColumnOption)

    const secondColumnOption: fitTextInBoxHelperOptions = {
      fontSizeMax: 15,
      horizontalAlign: 'center',
      verticalAlign: 'middle',
      margin: textMargin,
    }
    const secondColumnOptions: fitTextInBoxHelperOptions[] = Array(3).fill(secondColumnOption)

    twoColumnTableHelper(
      doc,
      xFirst,
      yFirst,
      wLeft,
      wRight,
      hList,
      firstColumnContents,
      secondColumnContents,
      firstColumnOptions,
      secondColumnOptions,
    )
  }

  const renderMainBillingTable = (mainBillingTable: mainBillingTableProps) => {
    const xFirst = width * 0.05
    const yFirst = height * 0.5
    const wLeft = width * 0.15
    const wRight = width * 0.15
    const hList = [height * 0.05, height * 0.05, height * 0.05]

    const firstColumnContents = ['請求金額(税込)', '当月出来高金額(税抜)', '消費税']
    const secondColumnContents = [
      mainBillingTable.billingAmountIncludingTax,
      mainBillingTable.thisMonthAmountExcludingTax,
      mainBillingTable.consumptionTax,
    ]

    const firstColumnOption: fitTextInBoxHelperOptions = {
      fontSizeMax: 15,
      horizontalAlign: 'left',
      verticalAlign: 'middle',
      margin: textMargin * 2,
    }
    const firstColumnOptions: fitTextInBoxHelperOptions[] = Array(3).fill(firstColumnOption)

    const secondColumnOption: fitTextInBoxHelperOptions = {
      fontSizeMax: 15,
      horizontalAlign: 'right',
      verticalAlign: 'middle',
      margin: textMargin * 2,
    }
    const secondColumnOptions: fitTextInBoxHelperOptions[] = Array(3).fill(secondColumnOption)

    twoColumnTableHelper(
      doc,
      xFirst,
      yFirst,
      wLeft,
      wRight,
      hList,
      firstColumnContents,
      secondColumnContents,
      firstColumnOptions,
      secondColumnOptions,
    )

    const w = wLeft + wRight
    const h = hList.reduce((a, b) => a + b)

    const currentLineWidth = doc.getLineWidth()
    doc.setLineWidth(currentLineWidth * 4)
    doc.rect(xFirst, yFirst, w, h)
    doc.setLineWidth(currentLineWidth)
  }

  const renderSubBillingTable = (subBillingTable: subBillingTableProps) => {
    const xFirst = width * 0.05
    const yFirst = height * 0.7
    const wLeft = width * 0.15
    const wRight = width * 0.15
    const hList = [height * 0.05, height * 0.05, height * 0.05]

    const firstColumnContents = [
      '契約金額(税込)',
      '前回迄累計請求金額(税込)',
      '今回迄累計請求金額(税込)',
    ]
    const secondColumnContents = [
      subBillingTable.contractAmountIncludingTax,
      subBillingTable.cumulativeBillingAmountUntilLastTimeIncludingTax,
      subBillingTable.cumulativeBillingAmountUntilCurrentTimeIncludingTax,
    ]

    const firstColumnOption: fitTextInBoxHelperOptions = {
      fontSizeMax: 15,
      horizontalAlign: 'left',
      verticalAlign: 'middle',
      margin: textMargin * 2,
    }
    const firstColumnOptions: fitTextInBoxHelperOptions[] = Array(3).fill(firstColumnOption)

    const secondColumnOption: fitTextInBoxHelperOptions = {
      fontSizeMax: 15,
      horizontalAlign: 'right',
      verticalAlign: 'middle',
      margin: textMargin * 2,
    }
    const secondColumnOptions: fitTextInBoxHelperOptions[] = Array(3).fill(secondColumnOption)

    twoColumnTableHelper(
      doc,
      xFirst,
      yFirst,
      wLeft,
      wRight,
      hList,
      firstColumnContents,
      secondColumnContents,
      firstColumnOptions,
      secondColumnOptions,
    )
  }

  const renderTerminationSettlementAmountTable = (terminationSettlementAmount: string) => {
    const xFirst = width * 0.05
    const yFirst = height * 0.86
    const wLeft = width * 0.15
    const wRight = width * 0.15
    const hList = [height * 0.05]

    const firstColumnContents = ['打切清算額(税込)']
    const secondColumnContents = [terminationSettlementAmount]

    const firstColumnOption: fitTextInBoxHelperOptions = {
      fontSizeMax: 15,
      horizontalAlign: 'left',
      verticalAlign: 'middle',
      margin: textMargin * 2,
    }
    const firstColumnOptions: fitTextInBoxHelperOptions[] = [firstColumnOption]

    const secondColumnOption: fitTextInBoxHelperOptions = {
      fontSizeMax: 15,
      horizontalAlign: 'right',
      verticalAlign: 'middle',
      margin: textMargin * 2,
    }
    const secondColumnOptions: fitTextInBoxHelperOptions[] = [secondColumnOption]

    twoColumnTableHelper(
      doc,
      xFirst,
      yFirst,
      wLeft,
      wRight,
      hList,
      firstColumnContents,
      secondColumnContents,
      firstColumnOptions,
      secondColumnOptions,
    )
  }

  const renderBillingCountTable = (billingCount: string) => {
    const xFirst = width * 0.4
    const yFirst = height * 0.8
    const wLeft = width * 0.07
    const wRight = width * 0.03
    const hList = [height * 0.05]

    const firstColumnContents = ['請求回数']
    const secondColumnContents = [billingCount]

    const firstColumnOption: fitTextInBoxHelperOptions = {
      fontSizeMax: 15,
      horizontalAlign: 'center',
      verticalAlign: 'middle',
      margin: textMargin * 2,
    }
    const firstColumnOptions: fitTextInBoxHelperOptions[] = [firstColumnOption]

    const secondColumnOption: fitTextInBoxHelperOptions = {
      fontSizeMax: 15,
      horizontalAlign: 'center',
      verticalAlign: 'middle',
      margin: textMargin * 2,
    }
    const secondColumnOptions: fitTextInBoxHelperOptions[] = [secondColumnOption]

    twoColumnTableHelper(
      doc,
      xFirst,
      yFirst,
      wLeft,
      wRight,
      hList,
      firstColumnContents,
      secondColumnContents,
      firstColumnOptions,
      secondColumnOptions,
    )
  }

  const renderCompletionStateTable = (completionState: string) => {
    const xFirst = width * 0.4
    const yFirst = height * 0.86
    const wLeft = width * 0.07
    const wRight = width * 0.03
    const hList = [height * 0.05]

    const firstColumnContents = ['完了区分']
    const secondColumnContents = [completionState]

    const firstColumnOption: fitTextInBoxHelperOptions = {
      fontSizeMax: 15,
      horizontalAlign: 'center',
      verticalAlign: 'middle',
      margin: textMargin * 2,
    }
    const firstColumnOptions: fitTextInBoxHelperOptions[] = [firstColumnOption]

    const secondColumnOption: fitTextInBoxHelperOptions = {
      fontSizeMax: 15,
      horizontalAlign: 'center',
      verticalAlign: 'middle',
      margin: textMargin * 2,
    }
    const secondColumnOptions: fitTextInBoxHelperOptions[] = [secondColumnOption]

    twoColumnTableHelper(
      doc,
      xFirst,
      yFirst,
      wLeft,
      wRight,
      hList,
      firstColumnContents,
      secondColumnContents,
      firstColumnOptions,
      secondColumnOptions,
    )
  }

  const renderCompanyInformationTable = (companyInformationTable: companyInformationTableProps) => {
    const xFirst = width * 0.6
    const yFirst = height * 0.4
    const wLeft = width * 0.1
    const wRight = width * 0.25
    const hList = [height * 0.05, height * 0.05, height * 0.1, height * 0.05, height * 0.05]

    const firstColumnContents = ['取引先コード', '社名', '住所', '電話', '担当者']
    const senderAddress = [
      companyInformationTable.companyPostalCode,
      companyInformationTable.companyAddress,
    ]
    const secondColumnContents = [
      companyInformationTable.companyReferenceCode,
      companyInformationTable.companyName,
      '',
      companyInformationTable.phoneNumber,
      companyInformationTable.personInCharge,
    ]

    const firstColumnOption: fitTextInBoxHelperOptions = {
      fontSizeMax: 15,
      horizontalAlign: 'center',
      verticalAlign: 'middle',
      margin: textMargin * 2,
    }
    const firstColumnOptions: fitTextInBoxHelperOptions[] = Array(5).fill(firstColumnOption)

    const secondColumnOption: fitTextInBoxHelperOptions = {
      fontSizeMax: 15,
      horizontalAlign: 'left',
      verticalAlign: 'middle',
      margin: textMargin * 2,
    }
    const secondColumnOptions: fitTextInBoxHelperOptions[] = Array(5).fill(secondColumnOption)
    secondColumnOptions[2] = {
      fontSizeMax: 15,
      horizontalAlign: 'left',
      verticalAlign: 'bottom',
      margin: textMargin * 2,
    }

    twoColumnTableHelper(
      doc,
      xFirst,
      yFirst,
      wLeft,
      wRight,
      hList,
      firstColumnContents,
      secondColumnContents,
      firstColumnOptions,
      secondColumnOptions,
    )

    doc.setFontSize(12)
    doc.text(
      senderAddress,
      xFirst + wLeft + textMargin,
      yFirst + (hList[0] ?? 0) + (hList[1] ?? 0) + textMargin,
      {
        maxWidth: wRight - textMargin * 2,
        baseline: 'top',
      },
    )
  }

  renderInvoiceTitle(invoiceData.invoiceTitleFirstPage)
  renderRecipientCompany(invoiceData.recipientCompany)
  renderConstructionName(invoiceData.constructionName)
  renderSubmitDate(invoiceData.submitDate)
  renderCompanyReferenceNumber(invoiceData.companyReferenceNumber)
  renderTransactionOverviewTable(invoiceData.transactionOverviewTable)
  renderMainBillingTable(invoiceData.mainBillingTable)
  renderSubBillingTable(invoiceData.subBillingTable)
  renderTerminationSettlementAmountTable(invoiceData.terminationSettlementAmount)
  renderBillingCountTable(invoiceData.billingCount)
  renderCompletionStateTable(invoiceData.completionState)
  renderCompanyInformationTable(invoiceData.companyInformationTable)
}

const renderSecondPage = (doc: jsPDF, invoiceData: invoiceDataProps) => {
  const width = doc.internal.pageSize.getWidth()
  const height = doc.internal.pageSize.getHeight()
  const textMargin = 1

  const renderInvoiceTitle = (invoiceTitle: string) => {
    doc.setFontSize(20)
    doc.text(invoiceTitle, width * 0.55, height * 0.1, { align: 'center' })
  }

  const renderSmallInformationTable = (invoiceData: invoiceDataProps) => {
    const xFirst = width * 0.05
    const yFirst = height * 0.13
    const wLeft = width * 0.1
    const wRight = width * 0.3
    const hList = [height * 0.03, height * 0.03]

    const firstColumnContents = ['社名', '注文 No.']
    const secondColumnContents = [
      invoiceData.companyInformationTable.companyName,
      invoiceData.transactionOverviewTable.orderNumber,
    ]

    const firstColumnOption: fitTextInBoxHelperOptions = {
      fontSizeMax: 15,
      horizontalAlign: 'center',
      verticalAlign: 'middle',
      margin: textMargin * 2,
    }
    const firstColumnOptions: fitTextInBoxHelperOptions[] = Array(2).fill(firstColumnOption)

    const secondColumnOption: fitTextInBoxHelperOptions = {
      fontSizeMax: 15,
      horizontalAlign: 'left',
      verticalAlign: 'middle',
      margin: textMargin * 2,
    }
    const secondColumnOptions: fitTextInBoxHelperOptions[] = Array(2).fill(secondColumnOption)

    twoColumnTableHelper(
      doc,
      xFirst,
      yFirst,
      wLeft,
      wRight,
      hList,
      firstColumnContents,
      secondColumnContents,
      firstColumnOptions,
      secondColumnOptions,
    )
  }

  const renderMainBilling = (mainBillingTable: mainBillingTableProps) => {
    const xFirst = width * 0.65
    const yFirst = height * 0.13
    const wLeft = width * 0.15
    const wRight = width * 0.15
    const hList = [height * 0.03, height * 0.03, height * 0.03]

    const firstColumnContents = ['当月出来高金額(税抜)', '消費税', '請求金額(税込)']
    const secondColumnContents = [
      mainBillingTable.thisMonthAmountExcludingTax,
      mainBillingTable.consumptionTax,
      mainBillingTable.billingAmountIncludingTax,
    ]

    const firstColumnOption: fitTextInBoxHelperOptions = {
      fontSizeMax: 12,
      horizontalAlign: 'right',
      verticalAlign: 'middle',
      margin: textMargin * 2,
    }
    const firstColumnOptions: fitTextInBoxHelperOptions[] = Array(3).fill(firstColumnOption)

    const secondColumnOption: fitTextInBoxHelperOptions = {
      fontSizeMax: 12,
      horizontalAlign: 'right',
      verticalAlign: 'middle',
      margin: textMargin * 2,
    }
    const secondColumnOptions: fitTextInBoxHelperOptions[] = Array(3).fill(secondColumnOption)

    twoColumnTableHelper(
      doc,
      xFirst,
      yFirst,
      wLeft,
      wRight,
      hList,
      firstColumnContents,
      secondColumnContents,
      firstColumnOptions,
      secondColumnOptions,
      false,
    )
  }

  const renderInvoiceDetailTable = (invoiceDetailTable: invoiceDetailTableProps) => {
    const xFirst = width * 0.05
    const yFirst = height * 0.25
    const w = width * 0.9
    const h = height * 0.7

    const numberColumns = invoiceDetailTable.header.length
    const numberRows = 1 + Math.max(15, invoiceDetailTable.items.length)

    const wRatios = Array(numberColumns).fill(1)
    const hRatios = Array(numberRows).fill(1)

    const divideLengthByRatio = (length: number, ratios: number[]): number[] => {
      const ratioSum = ratios.reduce((a, b) => a + b)
      if (ratioSum == 0) {
        return []
      } else {
        return ratios.map((ratio) => (length * ratio) / ratioSum)
      }
    }

    const wList = divideLengthByRatio(w, wRatios)
    const hList = divideLengthByRatio(h, hRatios)

    const xList = [xFirst].concat(wList)
    for (let i = 0; i < numberColumns; i++) {
      xList[i + 1] += xList[i] ?? 0
    }
    const xLast = xList[xList.length - 1] ?? 0

    const yList = [yFirst].concat(hList)
    for (let j = 0; j < numberRows; j++) {
      yList[j + 1] += yList[j] ?? 0
    }
    const yLast = yList[yList.length - 1] ?? 0

    const yHeaderTop = yList[0] ?? 0
    const yHeaderBottom = yList[1] ?? 0

    const drawTableLines = () => {
      for (const y of yList) {
        doc.line(xFirst, y, xLast, y)
      }

      for (const x of xList) {
        doc.line(x, yFirst, x, yLast)
      }
    }

    const fillTableHeader = () => {
      const h = yHeaderBottom - yHeaderTop

      const headerItemOption: fitTextInBoxHelperOptions = {
        fontSizeMax: 10,
        horizontalAlign: 'center',
        verticalAlign: 'middle',
        margin: textMargin,
      }

      for (let i = 0; i < numberColumns; i++) {
        fitTextInBoxHelper(
          doc,
          invoiceDetailTable.header[i] ?? '',
          xList[i] ?? 0,
          yHeaderTop,
          wList[i] ?? 0,
          h,
          headerItemOption,
        )
      }
    }

    const fillTableRow = (rowIndex: number, invoiceDetailRow: string[]) => {
      const y = yList[rowIndex] ?? 0
      const h = hList[rowIndex] ?? 0

      const rowItemOptions: fitTextInBoxHelperOptions[] = Array(12).fill({
        fontSizeMax: 10,
        horizontalAlign: 'center',
        verticalAlign: 'middle',
        margin: textMargin,
      })

      for (let i = 0; i < numberColumns; i++) {
        fitTextInBoxHelper(
          doc,
          invoiceDetailRow[i] ?? '',
          xList[i] ?? 0,
          y,
          wList[i] ?? 0,
          h,
          rowItemOptions[i],
        )
      }
    }

    drawTableLines()
    fillTableHeader()
    for (let i = 1; i < numberRows; i++) {
      fillTableRow(i, invoiceDetailTable.items[i - 1] ?? [])
    }
  }

  renderInvoiceTitle(invoiceData.invoiceTitleSecondPage)
  renderSmallInformationTable(invoiceData)
  renderMainBilling(invoiceData.mainBillingTable)
  renderInvoiceDetailTable(invoiceData.invoiceDetailTable)
}

export const generateInvoicePDF = (invoiceData: invoiceDataProps) => {
  const doc = new jsPDF({ orientation: 'l', unit: 'mm', format: 'a4' })

  doc.addFileToVFS('SourceHanSerif.ttf', sourceHanSerifFont)
  doc.addFont('SourceHanSerif.ttf', 'SourceHanSerif', 'normal')
  doc.setFont('SourceHanSerif', 'normal')

  renderFirstPage(doc, invoiceData)
  doc.addPage()
  renderSecondPage(doc, invoiceData)

  return doc
}
