import { Test, TestingModule } from '@nestjs/testing'
import { HttpStatus, INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'

const gql = '/graphql'

describe('AppController (e2e)', () => {
  let app: INestApplication

  const sendQuery = (query: string) =>
    request(app.getHttpServer()).post(gql).send({ query })

  const sendQuerySuccess = (query: string, expectation: (data: any) => void) =>
    sendQuery(query)
      .expect(HttpStatus.OK)
      .expect((res) => {
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

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!')
  })

  describe(gql, () => {
    describe('requests', () => {
      const checkRequests = async (...added: any) => {
        const expected = [
          {
            id: '1',
            requester: {
              id: '1',
              given_name: '信長',
              family_name: '織田',
              email: 'first@example.com',
              employee_code: '1-1',
              company: {
                id: '1',
                name: '第一株式会社',
              },
            },
            request_receivers: [
              {
                receiver: {
                  company: {
                    id: '1',
                    name: '第一株式会社',
                  },
                  email: 'second@user.com',
                  employee_code: '1-2',
                  family_name: '豊臣',
                  given_name: '秀吉',
                  id: '2',
                },
                receiver_id: 2,
                request_id: 1,
              },
              {
                receiver: {
                  company: {
                    id: '1',
                    name: '第一株式会社',
                  },
                  email: 'third@user.com',
                  employee_code: '1-3',
                  family_name: '徳川',
                  given_name: '家康',
                  id: '3',
                },
                receiver_id: 3,
                request_id: 1,
              },
            ],
            comments: [],
            judgements: [
              {
                id: '1',
              },
            ],
          },
          {
            id: '2',
            requester: {
              id: '3',
              given_name: '家康',
              family_name: '徳川',
              email: 'third@user.com',
              employee_code: '1-3',
              company: {
                id: '1',
                name: '第一株式会社',
              },
            },
            request_receivers: [
              {
                receiver: {
                  company: {
                    id: '1',
                    name: '第一株式会社',
                  },
                  email: 'third@user.com',
                  employee_code: '1-3',
                  family_name: '徳川',
                  given_name: '家康',
                  id: '3',
                },
                receiver_id: 3,
                request_id: 2,
              },
            ],
            comments: [],
            judgements: [
              {
                id: '2',
              },
            ],
          },
          {
            id: '3',
            requester: {
              id: '5',
              given_name: 'ガラシャ・たま',
              family_name: '細川',
              email: 'fifth@user.com',
              employee_code: '2-2',
              company: {
                id: '3',
                name: '第三コーポレーション',
              },
            },
            request_receivers: [
              {
                receiver: {
                  company: {
                    id: '1',
                    name: '第一株式会社',
                  },
                  email: 'third@user.com',
                  employee_code: '1-3',
                  family_name: '徳川',
                  given_name: '家康',
                  id: '3',
                },
                receiver_id: 3,
                request_id: 3,
              },
            ],
            comments: [],
            judgements: [
              {
                id: '3',
              },
            ],
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
                id
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

      it('should add and remove a request', async () => {
        await checkRequests()

        await sendQuerySuccess(
          `
        mutation {
          addRequest(newRequest: {
            requester_id: 1,
            invoice_id: 1,
            request_receiver_ids: [2,3]
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
                id: '4',
                requester: {
                  id: '1',
                  given_name: '信長',
                  family_name: '織田',
                  email: 'first@example.com',
                  employee_code: '1-1',
                  company: {
                    id: '1',
                    name: '第一株式会社',
                  },
                },
              },
            })
          },
        )
        await checkRequests({
          id: '4',
          comments: [],
          judgements: [],
          request_receivers: [],
          requester: {
            id: '1',
            given_name: '信長',
            family_name: '織田',
            email: 'first@example.com',
            employee_code: '1-1',
            company: {
              id: '1',
              name: '第一株式会社',
            },
          },
        })
        await sendQuerySuccess(
          `
            mutation {
              removeRequest(id: 4)
            }
          `,
          async (data) => {
            await expect(data.removeRequest).toEqual(true)
          },
        )
        await checkRequests()
      }, 15000)

      // it('should fail creating requests with same requester and receiver')
      // it('should fail creating requests with same elements in receivers')
      // it('should fail creating request of other companies')
      // it('should fail sending request to other company members')
    })
  })
})
