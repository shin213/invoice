import { jsPDF } from 'jspdf'
import { sourceHanSerifFont } from './SourceHanSerifJP-VF'

export const generateInvoicePDF = () => {
  interface fitTextInBoxHelperOptions {
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
    wLeft: number,
    wRight: number,
    yFirst: number,
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

  const invoiceTitle = () => {
    doc.setFontSize(20)
    doc.text('出来高報告　兼　請求書', width * 0.5, height * 0.1, { align: 'center' })
  }

  const addressCompany = () => {
    doc.setFontSize(12)
    doc.text('燈建設株式会社　御中', width * 0.12, height * 0.2)
  }

  const constructionName = () => {
    doc.setFontSize(10)
    doc.text('（工事名）', width * 0.1, height * 0.25)

    fitTextInBoxHelper(
      doc,
      '燈ビル新築工事',
      width * 0.1,
      height * 0.2,
      width * 0.5,
      height * 0.1,
      {
        fontSizeMax: 15,
        margin: textMargin,
      },
    )
    doc.line(width * 0.1, height * 0.3, width * 0.55, height * 0.3)
  }

  const submitDate = () => {
    const keyText = '提出日　：'
    const valueText = '2021/02/03'

    doc.setFontSize(12)
    doc.text(keyText, width * 0.75, height * 0.3 - textMargin, {
      align: 'right',
      baseline: 'bottom',
    })
    doc.line(
      width * 0.75 - doc.getTextWidth(keyText) - textMargin,
      height * 0.3,
      width * 0.9,
      height * 0.3,
    )
    fitTextInBoxHelper(doc, valueText, width * 0.75, height * 0.25, width * 0.15, height * 0.05, {
      fontSizeMax: 15,
      horizontalAlign: 'center',
      verticalAlign: 'bottom',
      margin: textMargin,
    })
  }

  const partnerReferenceNumber = () => {
    const keyText = '取引先照会No.　：'
    const valueText = 'UMI20150303'

    doc.text(keyText, width * 0.75, height * 0.35 - textMargin, {
      align: 'right',
      baseline: 'bottom',
    })
    doc.line(
      width * 0.75 - doc.getTextWidth(keyText) - textMargin,
      height * 0.35,
      width * 0.9,
      height * 0.35,
    )
    fitTextInBoxHelper(doc, valueText, width * 0.75, height * 0.3, width * 0.15, height * 0.05, {
      fontSizeMax: 15,
      horizontalAlign: 'right',
      verticalAlign: 'bottom',
      margin: textMargin,
    })
  }

  const transactionOverviewTable = () => {
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
      width * 0.1,
      width * 0.1,
      width * 0.3,
      height * 0.31,
      [height * 0.05, height * 0.05, height * 0.05],
      ['取引件名', '納工期', '注文 No.'],
      ['防水工事', '2020/12/04　～　2021/12/25', 'U-210101-112345'],
      firstColumnOptions,
      secondColumnOptions,
    )
  }

  const doc = new jsPDF({ orientation: 'l', unit: 'mm', format: 'a4' })

  doc.addFileToVFS('SourceHanSerif.ttf', sourceHanSerifFont)
  doc.addFont('SourceHanSerif.ttf', 'SourceHanSerif', 'normal')
  doc.setFont('SourceHanSerif', 'normal')

  const width = doc.internal.pageSize.getWidth()
  const height = doc.internal.pageSize.getHeight()

  const textMargin = 0.5

  invoiceTitle()
  addressCompany()
  constructionName()
  submitDate()
  partnerReferenceNumber()
  transactionOverviewTable()

  doc.rect(width * 0.1, height * 0.5, width * 0.25, height * 0.15)
  doc.rect(width * 0.1, height * 0.7, width * 0.25, height * 0.15)
  doc.rect(width * 0.4, height * 0.8, width * 0.1, height * 0.05)
  doc.rect(width * 0.1, height * 0.86, width * 0.25, height * 0.05)
  doc.rect(width * 0.4, height * 0.86, width * 0.1, height * 0.05)
  doc.rect(width * 0.6, height * 0.4, width * 0.3, height * 0.3)

  return doc
}
