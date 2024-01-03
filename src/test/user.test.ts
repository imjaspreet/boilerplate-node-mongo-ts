// user.test.ts

import request from 'supertest'
import app from '../index'
import { faker } from '@faker-js/faker'
const userId: string = '6594e9fb42b05fb7349c1b24'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const accessToken: string =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uIjoiNjU5M2YxOTc3YmM2ODA2MzdiOThjY2NlIiwidXNlciI6IjY1OTNlZjg5NTZkNzBmNmNjZWU0NmYxYiIsImlhdCI6MTcwNDE5NDQ1NSwiZXhwIjoxNzA0MjgwODU1fQ.1r9hcvtgWhhrETCU_1tmBEKgcOgG_nYCsUmEdRF31UY'
const email: string = faker.internet.email()
describe('User API Tests', () => {
  test('POST /api/users creates a new user', async () => {
    const newUser = {
      name: faker.person.fullName(),
      email: email,
      password: 'Qwerty@123',
      authMethod: 'email',
    }

    const response = await request(app)
      .post('/api/users')
      .send(newUser)
      .set('x-access-token', accessToken)
    console.log(response)
    // expect(response.status).toBe(201);
    expect(response.body.isSuccess)

    // userId = response.body.data.id
  })

  test('GET /api/users/:userId retrieves user details', async () => {
    // Arrange

    // Act
    const response = await request(app).get(`/api/users/${userId}`)

    // Assert
    expect(response.body.isSuccess).toBe(true)
    expect(response.data.id).toBe(userId)
  })

  test('GET /api/users/search retrieves matching users', async () => {
    // Arrange
    const userName = 'shambhu' // Part of the user name 'Alice'

    // Act
    const response = await request(app).get(`/api/users?name=${userName}`)

    // Assert
    // expect(response.body.isSuccess).toBe(true)
    expect(response.items).toHaveLength(1)
  })
})
