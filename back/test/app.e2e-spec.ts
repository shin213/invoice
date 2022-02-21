import { Test, TestingModule } from '@nestjs/testing'
import { HttpStatus, INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'
import { GraphQLError } from 'graphql'

const gql = '/graphql'

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
    expectation: (errors: GraphQLError[]) => void,
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
              givenName: '信長',
              familyName: '織田',
              email: 'first@example.com',
              employeeCode: '1-1',
              company: {
                id: 1,
                name: '第一株式会社',
              },
            },
            requestReceivers: [
              {
                receiver: {
                  company: {
                    id: 1,
                    name: '第一株式会社',
                  },
                  email: 'second@user.com',
                  employeeCode: '1-2',
                  familyName: '豊臣',
                  givenName: '秀吉',
                  id: 2,
                },
                receiverId: 2,
                requestId: 1,
              },
              {
                receiver: {
                  company: {
                    id: 1,
                    name: '第一株式会社',
                  },
                  email: 'third@user.com',
                  employeeCode: '1-3',
                  familyName: '徳川',
                  givenName: '家康',
                  id: 3,
                },
                receiverId: 3,
                requestId: 1,
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
              givenName: '家康',
              familyName: '徳川',
              email: 'third@user.com',
              employeeCode: '1-3',
              company: {
                id: 1,
                name: '第一株式会社',
              },
            },
            requestReceivers: [
              {
                receiver: {
                  company: {
                    id: 1,
                    name: '第一株式会社',
                  },
                  email: 'third@user.com',
                  employeeCode: '1-3',
                  familyName: '徳川',
                  givenName: '家康',
                  id: 3,
                },
                receiverId: 3,
                requestId: 2,
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
              givenName: 'ガラシャ・たま',
              familyName: '細川',
              email: 'fifth@user.com',
              employeeCode: '2-2',
              company: {
                id: 3,
                name: '第三コーポレーション',
              },
            },
            requestReceivers: [
              {
                receiver: {
                  company: {
                    id: 1,
                    name: '第一株式会社',
                  },
                  email: 'third@user.com',
                  employeeCode: '1-3',
                  familyName: '徳川',
                  givenName: '家康',
                  id: 3,
                },
                receiverId: 3,
                requestId: 3,
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
            requestReceivers: [],
            requester: {
              company: {
                id: 3,
                name: '第三コーポレーション',
              },
              email: 'fifth@user.com',
              employeeCode: '2-2',
              familyName: '細川',
              givenName: 'ガラシャ・たま',
              id: 5,
            },
          },
          {
            comments: [],
            id: 5,
            judgements: [],
            requestReceivers: [],
            requester: {
              company: {
                id: 3,
                name: '第三コーポレーション',
              },
              email: 'fifth@user.com',
              employeeCode: '2-2',
              familyName: '細川',
              givenName: 'ガラシャ・たま',
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
                givenName
                familyName
                email
                employeeCode
                company {
                  id
                  name
                }
              }
              requestReceivers {
                requestId
                receiverId
                receiver {
                  id
                  givenName
                  familyName
                  email
                  employeeCode
                  company {
                    id
                    name
                  }
                }
              }
              comments {
                userId
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
            requesterId: 1,
            invoiceId: "0e5cdeb1-a4e3-4407-b33e-88cf5dbec2ea",
            requestReceiverIds: [2,3],
            comment: "承認をお願いします。\\n今日中ですと助かります。"
          }) {
              id
              requester {
                id
                givenName
                familyName
                email
                employeeCode
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
                  givenName: '信長',
                  familyName: '織田',
                  email: 'first@example.com',
                  employeeCode: '1-1',
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
              userId: 1,
              content: '承認をお願いします。\n今日中ですと助かります。',
            },
          ],
          judgements: [],
          requestReceivers: [
            {
              receiver: {
                company: {
                  id: 1,
                  name: '第一株式会社',
                },
                email: 'second@user.com',
                employeeCode: '1-2',
                familyName: '豊臣',
                givenName: '秀吉',
                id: 2,
              },
              receiverId: 2,
              requestId: 6,
            },
            {
              receiver: {
                company: {
                  id: 1,
                  name: '第一株式会社',
                },
                email: 'third@user.com',
                employeeCode: '1-3',
                familyName: '徳川',
                givenName: '家康',
                id: 3,
              },
              receiverId: 3,
              requestId: 6,
            },
          ],
          requester: {
            id: 1,
            givenName: '信長',
            familyName: '織田',
            email: 'first@example.com',
            employeeCode: '1-1',
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
              requesterId: 1,
              invoiceId: "0e5cdeb1-a4e3-4407-b33e-88cf5dbec2ea",
              requestReceiverIds: [2,1,3],
              comment: "承認をお願いします。\\n今日中ですと助かります。"
            }) {
                id
                requester {
                  id
                  givenName
                  familyName
                  email
                  employeeCode
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
                extensions: {
                  code: 400,
                },
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
            requesterId: 1,
            invoiceId: "0e5cdeb1-a4e3-4407-b33e-88cf5dbec2ea",
            requestReceiverIds: [2,3,2],
            comment: "承認をお願いします。\\n今日中ですと助かります。"
          }) {
              id
              requester {
                id
                givenName
                familyName
                email
                employeeCode
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
                message: 'has duplicate elements in requestReceiverIds',
                locations: [
                  {
                    line: 3,
                    column: 11,
                  },
                ],
                path: ['addRequest'],
                extensions: {
                  code: 400,
                },
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
      it('should add an approving judgement', async () => {
        await sendQuerySuccess(
          `
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
          }
        `,
          (data) => {
            expect(data).toEqual({
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
        await sendQuerySuccess(
          `{
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
          }
        `,
          (data) => {
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
          },
        )
      })
      it('should add a declining judgement', async () => {
        await sendQuerySuccess(
          `
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
          }
        `,
          (data) => {
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
          },
        )
        await sendQuerySuccess(
          `{
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
          }
        `,
          (data) => {
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
          },
        )
      })
      it('should send ERROR adding judgement because judgement is already accepted', async () => {
        await sendQueryFailure(
          `
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
          }
        `,
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
          `
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
          }
        `,
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
            sendQuery(el).expect(async (res) => {
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
