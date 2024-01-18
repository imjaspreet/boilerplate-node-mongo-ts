// user.test.ts
import setupTestDB from './setupTestDB'
import request from 'supertest'
import app from '../app'
import { faker } from '@faker-js/faker'
import { token } from './auth.test'
const email: string = faker.internet.email()
let userId: string
setupTestDB()

describe('User API Tests ', () => {
  console.log(token)
  test('POST /api/users creates a new user', async () => {
    const newUser = {
      name: faker.person.fullName(),
      email: email,
      password: 'Qwerty@123',
      authMethod: 'email',
    }

    const response = await request(app)
      .post('/api/users')
      .set('x-access-token', token)
      .send(newUser)
    expect(response.body.isSuccess).toEqual(true)
    userId = response.body.isSuccess.data.id
  })

  test('POST /api/users/id update a user', async () => {
    const newUser = {
      name: faker.person.fullName().toLowerCase(),
    }

    const response = await request(app)
      .put(`/api/users/${userId}`)
      .set('x-access-token', token)
      .send(newUser)
    expect(response.body.isSuccess).toEqual(true)
  })
})
