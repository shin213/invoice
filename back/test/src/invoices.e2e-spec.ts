import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { AppModule } from './../../src/app.module'
import { gql, sendQuery } from 'test/test-lib'

describe('AppController (e2e)', () => {
  let app: INestApplication

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sendQuerySuccess = (query: string, expectation: (data: any) => void) =>
    sendQuery(app.getHttpServer(), query).expect((res) => {
      console.log(JSON.stringify(res.body))
      expectation(res.body.data)
    })

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  const successGetInvoiceLogsQuery = `
    {
      invoiceLogs {
        detail {
          elementId
          value
        }
        invoiceFormatLog {
          detailElements {
            id
            order
            label
            valueType
            own
          }
        }
      }
    }`

  describe(gql, () => {
    describe('invoiceDetails', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const checkinvoiceDetails = async (...added: any) => {
        const expected = [
          {
            detail: [
              [
                {
                  elementId: '609e5aff-6f94-47ef-be6b-354e7577aaaf',
                  value: '2022/03/04',
                },
                {
                  elementId: '363c070c-43a5-421f-bacc-a90d22425fb9',
                  value: '外壁　ACL坂足元',
                },
                {
                  elementId: '05e81f86-b9ee-4c2e-953c-314ca23a1a34',
                  value: '100',
                },
                {
                  elementId: 'd69a2cee-00a7-40ea-bd06-4c9134c639b4',
                  value: 'm',
                },
                {
                  elementId: 'dc7457e8-7680-462b-8e8e-65971f2d9458',
                  value: '1000',
                },
                {
                  elementId: '47e9c891-61de-4fc5-83a0-5375d04fd33f',
                  value: '100000',
                },
              ],
              [
                {
                  elementId: '609e5aff-6f94-47ef-be6b-354e7577aaaf',
                  value: '2022/03/04',
                },
                {
                  elementId: '363c070c-43a5-421f-bacc-a90d22425fb9',
                  value: 'AW周囲',
                },
                {
                  elementId: '05e81f86-b9ee-4c2e-953c-314ca23a1a34',
                  value: '33',
                },
                {
                  elementId: 'd69a2cee-00a7-40ea-bd06-4c9134c639b4',
                  value: 'm',
                },
                {
                  elementId: 'dc7457e8-7680-462b-8e8e-65971f2d9458',
                  value: '1000',
                },
                {
                  elementId: '47e9c891-61de-4fc5-83a0-5375d04fd33f',
                  value: '33333',
                },
              ],
              [
                {
                  elementId: '609e5aff-6f94-47ef-be6b-354e7577aaaf',
                  value: '2022/03/04',
                },
                {
                  elementId: '363c070c-43a5-421f-bacc-a90d22425fb9',
                  value: '既存外壁～水切取台',
                },
                {
                  elementId: '05e81f86-b9ee-4c2e-953c-314ca23a1a34',
                  value: '100',
                },
                {
                  elementId: 'd69a2cee-00a7-40ea-bd06-4c9134c639b4',
                  value: 'm',
                },
                {
                  elementId: 'dc7457e8-7680-462b-8e8e-65971f2d9458',
                  value: '750',
                },
                {
                  elementId: '47e9c891-61de-4fc5-83a0-5375d04fd33f',
                  value: '75000',
                },
              ],
              [
                {
                  elementId: '609e5aff-6f94-47ef-be6b-354e7577aaaf',
                  value: '2022/03/04',
                },
                {
                  elementId: '363c070c-43a5-421f-bacc-a90d22425fb9',
                  value: 'ACL板間',
                },
                {
                  elementId: '05e81f86-b9ee-4c2e-953c-314ca23a1a34',
                  value: '100',
                },
                {
                  elementId: 'd69a2cee-00a7-40ea-bd06-4c9134c639b4',
                  value: 'm',
                },
                {
                  elementId: 'dc7457e8-7680-462b-8e8e-65971f2d9458',
                  value: '750',
                },
                {
                  elementId: '47e9c891-61de-4fc5-83a0-5375d04fd33f',
                  value: '75000',
                },
              ],
            ],
            invoiceFormatLog: {
              detailElements: [
                {
                  id: '609e5aff-6f94-47ef-be6b-354e7577aaaf',
                  order: 1,
                  label: '月日',
                  valueType: 'date',
                  own: true,
                },
                {
                  id: '363c070c-43a5-421f-bacc-a90d22425fb9',
                  order: 2,
                  label: '摘要',
                  valueType: 'string',
                  own: true,
                },
                {
                  id: '05e81f86-b9ee-4c2e-953c-314ca23a1a34',
                  order: 3,
                  label: '数量',
                  valueType: 'number',
                  own: true,
                },
                {
                  id: 'd69a2cee-00a7-40ea-bd06-4c9134c639b4',
                  order: 4,
                  label: '単位',
                  valueType: 'string',
                  own: true,
                },
                {
                  id: 'dc7457e8-7680-462b-8e8e-65971f2d9458',
                  order: 5,
                  label: '単価',
                  valueType: 'number',
                  own: true,
                },
                {
                  id: '47e9c891-61de-4fc5-83a0-5375d04fd33f',
                  order: 6,
                  label: '金額',
                  valueType: 'number',
                  own: true,
                },
              ],
            },
          },
          ...added,
        ]
        return await sendQuerySuccess(
          successGetInvoiceLogsQuery,
          async (data) => {
            await expect(data.invoiceLogs).toEqual(expected)
          },
        )
      }

      it('should query invoice details', async () => {
        await checkinvoiceDetails()
      })
    })
  })
})
