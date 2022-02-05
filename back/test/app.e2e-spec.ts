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
      it('should get the requests array', () => {
        return sendQuerySuccess(
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
          (data) => {
            expect(data.requests).toEqual([
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
              {
                comments: [],
                id: '4',
                judgements: [],
                request_receivers: [],
                requester: {
                  company: {
                    id: '1',
                    name: '第一株式会社',
                  },
                  email: 'first@example.com',
                  employee_code: '1-1',
                  family_name: '織田',
                  given_name: '信長',
                  id: '1',
                },
              },
            ])
          },
        )
      })

      it('should create requests', () => {
        sendQuerySuccess(
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
          (data) => {
            expect(data).toEqual({
              addRequest: {
                id: '5',
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
      })

      it('should remove requests', () => {
        sendQuerySuccess(
          `
        mutation {
          removeRequest(id: 5)
        }
        `,
          (data) => {
            expect(data.removeRequest).toEqual(true)
          },
        )
      })

      // it('should fail creating requests with same requester and receiver')
      // it('should fail creating requests with same elements in receivers')
    })
  })
})
