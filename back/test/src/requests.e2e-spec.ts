import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { AppModule } from './../../src/app.module'
import { GraphQLError } from 'graphql'
import { gql, sendQuery } from './../test-lib'

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
    jest.setTimeout(50000)

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  const successGetRequestsQuery = `
    query {
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
    }`

  const successAddRequestQuery = `
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
    }`

  const successRemoveRequest = `
    mutation {
      removeRequest(id: 6)
    }`

  const failAddBySameRequesterAndReceiverQuery = `
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
    }`

  const failAddByDuplicatedReceiversQuery = `
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
    }`

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
            comments: [
              {
                content: '1コメ',
                userId: 1,
              },
              {
                content: '4コメ',
                userId: 2,
              },
              {
                content: '5コメ',
                userId: 3,
              },
            ],
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
            comments: [
              {
                content: '2コメ',
                userId: 2,
              },
            ],
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
            comments: [
              {
                content: '3コメ',
                userId: 3,
              },
            ],
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

        return await sendQuerySuccess(successGetRequestsQuery, async (data) => {
          await expect(data.requests).toEqual(expected)
        })
      }

      it('should add a request', async () => {
        await checkRequests()

        await sendQuerySuccess(successAddRequestQuery, async (data) => {
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
        })

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

        await sendQuerySuccess(successRemoveRequest, async (data) => {
          await expect(data.removeRequest).toEqual(true)
        })
        await checkRequests()
      }, 15000)

      it('should fail creating requests with same requester and receiver', async () => {
        await sendQueryFailure(
          failAddBySameRequesterAndReceiverQuery,
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
          failAddByDuplicatedReceiversQuery,
          async (errors) => {
            await expect(errors).toEqual([
              {
                message: 'has duplicate elements in requestReceiverIds',
                locations: [
                  {
                    line: 3,
                    column: 7,
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
  })
})
