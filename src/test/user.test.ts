// user.test.ts
import setupTestDB from './setupTestDB'
import request from 'supertest'
import app from '../app'
import Session from '../models/session'
import { faker } from '@faker-js/faker'
const email: string = faker.internet.email()
let userId: string
setupTestDB()

// const getAccessToken = async () => {
//   const session = await Session.findOne({ status: 'active' }).sort({
//     createdAt: -1,
//   })
//   const accessToken = session?.accessToken
//   return accessToken
// }

let accessToken: string
// beforeAll(async () => {
//   accessToken = await getAccessToken()
//   console.log(accessToken)
// })

describe('User API Tests ', () => {
  test('POST /api/users creates a new user', async () => {
    const newUser = {
      name: faker.person.fullName(),
      email: email,
      password: 'Qwerty@123',
      authMethod: 'email',
    }
    // accessToken = await getAccessToken()
    const response = await request(app)
      .post('/api/users')
      .set('x-access-token', accessToken)
      .send(newUser)
    expect(response.body.isSuccess)
    userId = response.body.isSuccess.data.id
  })

  test('POST /api/users/id update a user', async () => {
    const newUser = {
      name: faker.person.fullName().toLowerCase(),
    }

    const response = await request(app)
      .put(`/api/users/${userId}`)
      .set('x-access-token', accessToken)
      .send(newUser)
    expect(response.body.isSuccess)
  })
})
