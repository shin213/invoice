import { HttpStatus, INestApplication } from '@nestjs/common'
import { compileTestingModule, sendQueryFailure } from './../../test-lib'

const addAlreadyDeclinedJudgementQuery = `
  mutation {
    addJudgement(newJudgement: {
      userId: "d2e1e2e5-42d5-440d-b34b-95b8e2e7485d",
      comment: "問題ないので承認します",
      requestId: 2,
      type: "approve"
    }) {
      id
      userId
      type
      requestId
    }
  }
`

describe('Judgements Test', () => {
  let app: INestApplication

  beforeAll(async () => {
    app = await compileTestingModule()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Add already declined judgement', async () => {
    // test case
    // 1. addのqueryを実行
    // 2. 失敗を評価

    sendQueryFailure(
      app.getHttpServer(),
      addAlreadyDeclinedJudgementQuery,
      async (errors) => {
        await expect(errors).toEqual([
          {
            message: 'status of request is not requesting but declined',
            locations: [{ line: 3, column: 13 }],
            path: ['addJudgement'],
            extensions: {
              code: HttpStatus.BAD_REQUEST,
            },
            name: 'HttpException',
          },
        ])
      },
    )
  })
})
