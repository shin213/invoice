import { jsPDF } from 'jspdf'
import { sourceHanSerifFont } from './SourceHanSerifJP-VF'

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

export type invoiceDataProps = {
  invoiceTitle: string
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
}

export const generateInvoicePDF = (invoiceData: invoiceDataProps) => {
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
    xFirst: number,
    yFirst: number,
    wLeft: number,
    wRight: number,
    hList: number[],
    firstColumnContent: string[],
    secondColumnContent: string[],
    firstColumnOptions?: fitTextInBoxHelperOptions[],
    secondColumnOptions?: fitTextInBoxHelperOptions[],
  ) => {
    firstColumnOptions = firstColumnOptions ?? []
    secondColumnOptions = secondColumnOptions ?? []

    const xMiddle = xFirst + wLeft
    const xLast = xMiddle + wRight
    const numberRows = hList.length

    const yList = [yFirst].concat(hList)
    for (let j = 0; j < numberRows; j++) {
      yList[j + 1] += yList[j] ?? 0
    }
    const yLast = yList[yList.length - 1] ?? 0

    doc.rect(xFirst, yFirst, xLast - xFirst, yLast - yFirst)

    for (const yElem of yList) {
      doc.line(xFirst, yElem, xLast, yElem)
    }

    doc.setLineDashPattern([1, 1], 0)
    doc.line(xMiddle, yFirst, xMiddle, yLast)
    doc.setLineDashPattern([], 0)

    for (let j = 0; j < numberRows; j++) {
      const text = firstColumnContent[j] ?? ''
      const option = firstColumnOptions[j]
      const y = yList[j] ?? 0
      const h = hList[j] ?? 0
      fitTextInBoxHelper(doc, text, xFirst, y, wLeft, h, option)
    }

    for (let j = 0; j < numberRows; j++) {
      const text = secondColumnContent[j] ?? ''
      const option = secondColumnOptions[j]
      const y = yList[j] ?? 0
      const h = hList[j] ?? 0
      fitTextInBoxHelper(doc, text, xMiddle, y, wRight, h, option)
    }
  }

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
    doc.text('（工事名）', width * 0.05, height * 0.25)

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

    const firstColumnContent = ['取引件名', '納工期', '注文 No.']
    const secondColumnContent = [
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
      xFirst,
      yFirst,
      wLeft,
      wRight,
      hList,
      firstColumnContent,
      secondColumnContent,
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

    const firstColumnContent = ['請求金額（税込）', '当月出来高金額（税抜）', '消費税']
    const secondColumnContent = [
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
      xFirst,
      yFirst,
      wLeft,
      wRight,
      hList,
      firstColumnContent,
      secondColumnContent,
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

    const firstColumnContent = [
      '契約金額（税込）',
      '前回迄累計請求金額（税込）',
      '今回迄累計請求金額（税込）',
    ]
    const secondColumnContent = [
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
      xFirst,
      yFirst,
      wLeft,
      wRight,
      hList,
      firstColumnContent,
      secondColumnContent,
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

    const firstColumnContent = ['打切清算額（税込）']
    const secondColumnContent = [terminationSettlementAmount]

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
      xFirst,
      yFirst,
      wLeft,
      wRight,
      hList,
      firstColumnContent,
      secondColumnContent,
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

    const firstColumnContent = ['請求回数']
    const secondColumnContent = [billingCount]

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
      xFirst,
      yFirst,
      wLeft,
      wRight,
      hList,
      firstColumnContent,
      secondColumnContent,
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

    const firstColumnContent = ['完了区分']
    const secondColumnContent = [completionState]

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
      xFirst,
      yFirst,
      wLeft,
      wRight,
      hList,
      firstColumnContent,
      secondColumnContent,
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

    const firstColumnContent = ['取引先コード', '社名', '住所', '電話', '担当者']
    const senderAddress = [
      companyInformationTable.companyPostalCode,
      companyInformationTable.companyAddress,
    ]
    const secondColumnContent = [
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
      xFirst,
      yFirst,
      wLeft,
      wRight,
      hList,
      firstColumnContent,
      secondColumnContent,
      firstColumnOptions,
      secondColumnOptions,
    )

    doc.setFontSize(12)
    doc.text(senderAddress, xFirst + wLeft + textMargin, yFirst + (hList[0] ?? 0) + (hList[1] ?? 0) + textMargin, {
      maxWidth: wRight - textMargin * 2,
      baseline: 'top',
    })
  }

  const doc = new jsPDF({ orientation: 'l', unit: 'mm', format: 'a4' })

  doc.addFileToVFS('SourceHanSerif.ttf', sourceHanSerifFont)
  doc.addFont('SourceHanSerif.ttf', 'SourceHanSerif', 'normal')
  doc.setFont('SourceHanSerif', 'normal')

  const width = doc.internal.pageSize.getWidth()
  const height = doc.internal.pageSize.getHeight()

  const textMargin = 0.5

  renderInvoiceTitle(invoiceData.invoiceTitle)
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

  return doc
}
