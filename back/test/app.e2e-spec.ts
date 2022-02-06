import { Test, TestingModule } from '@nestjs/testing'
import { HttpStatus, INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'

const gql = '/graphql'

type Error = {
  message: string
  locations: {
    line: number
    column: number
  }[]
  path: string[]
  code: HttpStatus
  name: string
}

describe('AppController (e2e)', () => {
  let app: INestApplication

  const sendQuery = (query: string) =>
    request(app.getHttpServer()).post(gql).send({ query }).expect(HttpStatus.OK)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sendQuerySuccess = (query: string, expectation: (data: any) => void) =>
    sendQuery(query).expect((res) => {
      console.log(JSON.stringify(res.body))
      expectation(res.body.data)
    })

  const sendQueryFailure = (
    query: string,
    expectation: (errors: Error[]) => void,
  ) =>
    sendQuery(query).expect((res) => {
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

  it('/ (GET)', async () => {
    await request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!')
  })

  describe(gql, () => {
    describe('requests', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const checkRequests = async (...added: any) => {
        const expected = [
          {
            id: 1,
            requester: {
              id: 1,
              given_name: '信長',
              family_name: '織田',
              email: 'first@example.com',
              employee_code: '1-1',
              company: {
                id: 1,
                name: '第一株式会社',
              },
            },
            request_receivers: [
              {
                receiver: {
                  company: {
                    id: 1,
                    name: '第一株式会社',
                  },
                  email: 'second@user.com',
                  employee_code: '1-2',
                  family_name: '豊臣',
                  given_name: '秀吉',
                  id: 2,
                },
                receiver_id: 2,
                request_id: 1,
              },
              {
                receiver: {
                  company: {
                    id: 1,
                    name: '第一株式会社',
                  },
                  email: 'third@user.com',
                  employee_code: '1-3',
                  family_name: '徳川',
                  given_name: '家康',
                  id: 3,
                },
                receiver_id: 3,
                request_id: 1,
              },
            ],
            comments: [],
            judgements: [
              {
                id: 1,
              },
            ],
          },
          {
            id: 2,
            requester: {
              id: 3,
              given_name: '家康',
              family_name: '徳川',
              email: 'third@user.com',
              employee_code: '1-3',
              company: {
                id: 1,
                name: '第一株式会社',
              },
            },
            request_receivers: [
              {
                receiver: {
                  company: {
                    id: 1,
                    name: '第一株式会社',
                  },
                  email: 'third@user.com',
                  employee_code: '1-3',
                  family_name: '徳川',
                  given_name: '家康',
                  id: 3,
                },
                receiver_id: 3,
                request_id: 2,
              },
            ],
            comments: [],
            judgements: [
              {
                id: 2,
              },
            ],
          },
          {
            id: 3,
            requester: {
              id: 5,
              given_name: 'ガラシャ・たま',
              family_name: '細川',
              email: 'fifth@user.com',
              employee_code: '2-2',
              company: {
                id: 3,
                name: '第三コーポレーション',
              },
            },
            request_receivers: [
              {
                receiver: {
                  company: {
                    id: 1,
                    name: '第一株式会社',
                  },
                  email: 'third@user.com',
                  employee_code: '1-3',
                  family_name: '徳川',
                  given_name: '家康',
                  id: 3,
                },
                receiver_id: 3,
                request_id: 3,
              },
            ],
            comments: [],
            judgements: [
              {
                id: 3,
              },
            ],
          },
          {
            comments: [],
            id: 4,
            judgements: [],
            request_receivers: [],
            requester: {
              company: {
                id: 3,
                name: '第三コーポレーション',
              },
              email: 'fifth@user.com',
              employee_code: '2-2',
              family_name: '細川',
              given_name: 'ガラシャ・たま',
              id: 5,
            },
          },
          {
            comments: [],
            id: 5,
            judgements: [],
            request_receivers: [],
            requester: {
              company: {
                id: 3,
                name: '第三コーポレーション',
              },
              email: 'fifth@user.com',
              employee_code: '2-2',
              family_name: '細川',
              given_name: 'ガラシャ・たま',
              id: 5,
            },
          },
          ...added,
        ]
        return await sendQuerySuccess(
          `{
            requests {
              id
              requester {
                id
                given_name
                family_name
                email
                employee_code
                company {
                  id
                  name
                }
              }
              request_receivers {
                request_id
                receiver_id
                receiver {
                  id
                  given_name
                  family_name
                  email
                  employee_code
                  company {
                    id
                    name
                  }
                }
              }
              comments {
                user_id
                content
              }
              judgements {
                id
              }
            }
          }`,
          async (data) => {
            await expect(data.requests).toEqual(expected)
          },
        )
      }

      it('should add a request', async () => {
        await checkRequests()

        await sendQuerySuccess(
          `
        mutation {
          addRequest(newRequest: {
            requester_id: 1,
            invoice_id: 1,
            request_receiver_ids: [2,3],
            comment: "承認をお願いします。\\n今日中ですと助かります。"
          }) {
              id
              requester {
                id
                given_name
                family_name
                email
                employee_code
                company {
                  id
                  name
                }
              }
            }
        }
        `,
          async (data) => {
            await expect(data).toEqual({
              addRequest: {
                id: 6,
                requester: {
                  id: 1,
                  given_name: '信長',
                  family_name: '織田',
                  email: 'first@example.com',
                  employee_code: '1-1',
                  company: {
                    id: 1,
                    name: '第一株式会社',
                  },
                },
              },
            })
          },
        )
        await checkRequests({
          id: 6,
          comments: [
            {
              user_id: 1,
              content: '承認をお願いします。\n今日中ですと助かります。',
            },
          ],
          judgements: [],
          request_receivers: [
            {
              receiver: {
                company: {
                  id: 1,
                  name: '第一株式会社',
                },
                email: 'second@user.com',
                employee_code: '1-2',
                family_name: '豊臣',
                given_name: '秀吉',
                id: 2,
              },
              receiver_id: 2,
              request_id: 6,
            },
            {
              receiver: {
                company: {
                  id: 1,
                  name: '第一株式会社',
                },
                email: 'third@user.com',
                employee_code: '1-3',
                family_name: '徳川',
                given_name: '家康',
                id: 3,
              },
              receiver_id: 3,
              request_id: 6,
            },
          ],
          requester: {
            id: 1,
            given_name: '信長',
            family_name: '織田',
            email: 'first@example.com',
            employee_code: '1-1',
            company: {
              id: 1,
              name: '第一株式会社',
            },
          },
        })
        // await sendQuerySuccess(
        //   `
        //     mutation {
        //       removeRequest(id: 4)
        //     }
        //   `,
        //   async (data) => {
        //     await expect(data.removeRequest).toEqual(true)
        //   },
        // )
        // await checkRequests()
      }, 15000)

      it('should fail creating requests with same requester and receiver', async () => {
        await sendQueryFailure(
          `
          mutation {
            addRequest(newRequest: {
              requester_id: 1,
              invoice_id: 1,
              request_receiver_ids: [2,1,3],
              comment: "承認をお願いします。\\n今日中ですと助かります。"
            }) {
                id
                requester {
                  id
                  given_name
                  family_name
                  email
                  employee_code
                  company {
                    id
                    name
                  }
                }
              }
          }
        `,
          async (errors) => {
            await expect(errors).toEqual([
              {
                message: 'receiver cannot be requester',
                locations: [
                  {
                    line: 3,
                    column: 13,
                  },
                ],
                path: ['addRequest'],
                code: 400,
                name: 'HttpException',
              },
            ])
          },
        )
      })
      it('should fail creating requests with same elements in receivers', async () => {
        await sendQueryFailure(
          `
        mutation {
          addRequest(newRequest: {
            requester_id: 1,
            invoice_id: 1,
            request_receiver_ids: [2,3,2],
            comment: "承認をお願いします。\\n今日中ですと助かります。"
          }) {
              id
              requester {
                id
                given_name
                family_name
                email
                employee_code
                company {
                  id
                  name
                }
              }
            }
        }
      `,
          async (errors) => {
            await expect(errors).toEqual([
              {
                message: 'has duplicate elements in request_receiver_ids',
                locations: [
                  {
                    line: 3,
                    column: 11,
                  },
                ],
                path: ['addRequest'],
                code: 400,
                name: 'HttpException',
              },
            ])
          },
        )
      })
      // it('should fail creating request of other companies')
      // it('should fail sending request to other company members')
    })

    describe('judgements', () => {
      it('should add a approving judgement', async () => {
        await sendQuerySuccess(
          `
          mutation {
            addJudgement(newJudgement: {
              user_id: 1,
              comment: "問題ないので承認します",
              request_id: 1,
              type: "approve"
            }) {
              id
              user {
                given_name
                family_name
              }
              type
              request_id
              request {
                id
              }
            }
          }
        `,
          (data) => {
            expect(data).toEqual({
              addJudgement: {
                id: 4,
                user: {
                  given_name: '信長',
                  family_name: '織田',
                },
                type: 'approve',
                request_id: 1,
                request: {
                  id: 1,
                },
              },
            })
          },
        )
        await sendQuerySuccess(
          `{
              getJudgement(id: 4) {
              id
              user {
                given_name
                family_name
              }
              comments {
                user {
                  family_name
                  given_name
                }
                content
              }
              type
              request_id
              request {
                id
                status
              }
            }
          }
        `,
          (data) => {
            expect(data).toEqual({
              getJudgement: {
                id: 4,
                user: {
                  given_name: '信長',
                  family_name: '織田',
                },
                comments: [
                  {
                    user: {
                      family_name: '織田',
                      given_name: '信長',
                    },
                    content: '問題ないので承認します',
                  },
                ],
                type: 'approve',
                request_id: 1,
                request: {
                  id: 1,
                  status: 'approved',
                },
              },
            })
          },
        )
      })
      it('should add a declining judgement', async () => {
        await sendQuerySuccess(
          `
          mutation {
            addJudgement(newJudgement: {
              user_id: 1,
              comment: "ここはどういうことですか",
              request_id: 3,
              type: "decline"
            }) {
              id
              user {
                given_name
                family_name
              }
              type
              request_id
              request {
                id
              }
            }
          }
        `,
          (data) => {
            expect(data).toEqual({
              addJudgement: {
                id: 5,
                user: {
                  given_name: '信長',
                  family_name: '織田',
                },
                type: 'decline',
                request_id: 3,
                request: {
                  id: 3,
                },
              },
            })
          },
        )
        await sendQuerySuccess(
          `{
              getJudgement(id: 5) {
              id
              user {
                given_name
                family_name
              }
              comments {
                user {
                  family_name
                  given_name
                }
                content
              }
              type
              request_id
              request {
                id
                status
              }
            }
          }
        `,
          (data) => {
            expect(data).toEqual({
              getJudgement: {
                id: 5,
                user: {
                  given_name: '信長',
                  family_name: '織田',
                },
                comments: [
                  {
                    user: {
                      family_name: '織田',
                      given_name: '信長',
                    },
                    content: 'ここはどういうことですか',
                  },
                ],
                type: 'decline',
                request_id: 3,
                request: {
                  id: 3,
                  status: 'declined',
                },
              },
            })
          },
        )
      })
      it('should send ERROR adding judgement because judgement is already accepted', async () => {
        await sendQueryFailure(
          `
          mutation {
            addJudgement(newJudgement: {
              user_id: 1,
              comment: "問題ないので承認します",
              request_id: 4,
              type: "approve"
            }) {
              id
              user {
                given_name
                family_name
              }
              type
              request_id
              request {
                id
              }
            }
          }
        `,
          async (errors) => {
            await expect(errors).toEqual([
              {
                message: 'status of request is not requesting but approved',
                locations: [{ line: 3, column: 13 }],
                path: ['addJudgement'],
                code: HttpStatus.BAD_REQUEST,
                name: 'HttpException',
              },
            ])
          },
        )
      })
      it('should send ERROR adding judgement because judgement is already declined', async () => {
        await sendQueryFailure(
          `
          mutation {
            addJudgement(newJudgement: {
              user_id: 1,
              comment: "ここはどういうことですか",
              request_id: 2,
              type: "approve"
            }) {
              id
              user {
                given_name
                family_name
              }
              type
              request_id
              request {
                id
              }
            }
          }
        `,
          async (errors) => {
            console.error(errors)
            await expect(errors).toEqual([
              {
                message: 'status of request is not requesting but declined',
                locations: [{ line: 3, column: 13 }],
                path: ['addJudgement'],
                code: HttpStatus.BAD_REQUEST,
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
            user_id: 1,
            comment: "問題ないので承認します",
            request_id: 5,
            type: "approve"
          }) {
            id
            user {
              given_name
              family_name
            }
            type
            request_id
            request {
              id
              status
            }
          }
        }
      `,
        )
        const results: { errors?: Error[] | null }[] = []
        await Promise.all(
          promises.map((el) =>
            sendQuery(el).expect(async (res) => {
              results.push(res.body)
            }),
          ),
        )
        const errorResult = results.find((el) => !!el.errors)
        const errors = errorResult?.errors
        expect(errors[0].code).toEqual(HttpStatus.CONFLICT)
      })
    })
  })
})
