import { Test, TestingModule } from '@nestjs/testing'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { AppModule } from './../../src/app.module'
import { GraphQLError } from 'graphql'
import { gql, sendQuery } from 'test/test-lib'

describe('AppController (e2e)', () => {
  let app: INestApplication

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sendQuerySuccess = (query: string, expectation: (data: any) => void) =>
    sendQuery(app.getHttpServer(), query).expect((res) => {
      console.log(JSON.stringify(res.body))
      expectation(res.body.data)
    })

  const sendQueryFailure = (
    query: string,
    expectation: (errors: GraphQLError[]) => void,
  ) =>
    sendQuery(app.getHttpServer(), query).expect((res) => {
      console.log(JSON.stringify(res.body))
      expectation(res.body.errors)
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

  const successAddApprovingJudgementQuery = `
    mutation {
      addJudgement(newJudgement: {
        userId: 1,
        comment: "問題ないので承認します",
        requestId: 1,
        type: "approve"
      }) {
        id
        user {
          givenName
          familyName
        }
        type
        requestId
        request {
          id
        }
      }
    }`

  const successGetId4JudgementQuery = `
    {
      getJudgement(id: 4) {
        id
        user {
          givenName
          familyName
        }
        comments {
          user {
            familyName
            givenName
          }
          content
        }
        type
        requestId
        request {
          id
          status
        }
      }
    }`

  const successAddDecliningJudgementQuery = `
    mutation {
      addJudgement(newJudgement: {
        userId: 1,
        comment: "ここはどういうことですか",
        requestId: 3,
        type: "decline"
      }) {
        id
        user {
          givenName
          familyName
        }
        type
        requestId
        request {
          id
        }
      }
    }`

  const successGetId5JudgementQuery = `
    {
      getJudgement(id: 5) {
        id
        user {
          givenName
          familyName
        }
        comments {
          user {
            familyName
            givenName
          }
          content
        }
        type
        requestId
        request {
          id
          status
        }
      }
    }`

  const failAddByAlreadyAcceptedJudgementQuery = `
    mutation {
      addJudgement(newJudgement: {
        userId: 1,
        comment: "問題ないので承認します",
        requestId: 4,
        type: "approve"
      }) {
        id
        user {
          givenName
          familyName
        }
        type
        requestId
        request {
          id
        }
      }
    }`

  const failAddByAlreadyDeclinedJudgementQuery = `
    mutation {
      addJudgement(newJudgement: {
        userId: 1,
        comment: "ここはどういうことですか",
        requestId: 2,
        type: "approve"
      }) {
        id
        user {
          givenName
          familyName
        }
        type
        requestId
        request {
          id
        }
      }
    }`

  describe(gql, () => {
    describe('judgements', () => {
      it('should add an approving judgement', async () => {
        await sendQuerySuccess(
          successAddApprovingJudgementQuery,
          async (data) => {
            await expect(data).toEqual({
              addJudgement: {
                id: 4,
                user: {
                  givenName: '信長',
                  familyName: '織田',
                },
                type: 'approve',
                requestId: 1,
                request: {
                  id: 1,
                },
              },
            })
          },
        )

        await sendQuerySuccess(successGetId4JudgementQuery, (data) => {
          expect(data).toEqual({
            getJudgement: {
              id: 4,
              user: {
                givenName: '信長',
                familyName: '織田',
              },
              comments: [
                {
                  user: {
                    familyName: '織田',
                    givenName: '信長',
                  },
                  content: '問題ないので承認します',
                },
              ],
              type: 'approve',
              requestId: 1,
              request: {
                id: 1,
                status: 'approved',
              },
            },
          })
        })
      })

      it('should add a declining judgement', async () => {
        await sendQuerySuccess(successAddDecliningJudgementQuery, (data) => {
          expect(data).toEqual({
            addJudgement: {
              id: 5,
              user: {
                givenName: '信長',
                familyName: '織田',
              },
              type: 'decline',
              requestId: 3,
              request: {
                id: 3,
              },
            },
          })
        })

        await sendQuerySuccess(successGetId5JudgementQuery, (data) => {
          expect(data).toEqual({
            getJudgement: {
              id: 5,
              user: {
                givenName: '信長',
                familyName: '織田',
              },
              comments: [
                {
                  user: {
                    familyName: '織田',
                    givenName: '信長',
                  },
                  content: 'ここはどういうことですか',
                },
              ],
              type: 'decline',
              requestId: 3,
              request: {
                id: 3,
                status: 'declined',
              },
            },
          })
        })
      })

      it('should send ERROR adding judgement because judgement is already accepted', async () => {
        await sendQueryFailure(
          failAddByAlreadyAcceptedJudgementQuery,
          async (errors) => {
            await expect(errors).toEqual([
              {
                message: 'status of request is not requesting but approved',
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

      it('should send ERROR adding judgement because judgement is already declined', async () => {
        await sendQueryFailure(
          failAddByAlreadyDeclinedJudgementQuery,
          async (errors) => {
            console.error(errors)
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

      it('should handle CONFLICT when creating judgement', async () => {
        const promises = Array.from(
          Array(100),
          () => `
          mutation {
            addJudgement(newJudgement: {
              userId: 1,
              comment: "問題ないので承認します",
              requestId: 5,
              type: "approve"
            }) {
              id
              user {
                givenName
                familyName
              }
              type
              requestId
              request {
                id
                status
              }
            }
          }
        `,
        )
        const results: { errors?: GraphQLError[] | undefined }[] = []
        await Promise.all(
          promises.map((el) =>
            sendQuery(app.getHttpServer(), el).expect(async (res) => {
              results.push(res.body)
            }),
          ),
        )
        const errorResult = results.find((el) => !!el.errors)
        const errors = errorResult?.errors ?? [undefined]
        expect(errors[0]?.extensions?.code).toEqual(HttpStatus.CONFLICT)
      })
    })
  })
})
