// user.test.ts

import request from 'supertest'
import app from '../index'
import { faker } from '@faker-js/faker'
let userId: string
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let accessToken: string
const email: string = faker.internet.email()
describe('User API Tests', () => {
  test('POST /api/auths/login user', async () => {
    // Arrange
    const newUser = {
      email: 'shambhu@yopmail.com',
      password: 'Qwerty@123',
      authMethod: 'email',
    }

    // Act
    const response = await request(app).post('/api/auths/login').send(newUser)
    // Assert
    expect(response.body.isSuccess).toBe(true)
    accessToken = response.body.data.session.accessToken

    // expect(response.body.data).toEqual(newUser)
  })
  test('POST /api/users creates a new user', async () => {
    // Arrange
    const newUser = {
      name: faker.person.fullName(),
      email: email,
      password: 'Qwerty@123',
      authMethod: 'email',
    }

    // Act
    const response = await request(app).post('/api/users').send(newUser)
    // Assert
    expect(response.body.isSuccess).toBe(true)

    userId = response.body.data.id
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
    expect(response.body.isSuccess).toBe(true)
    expect(response.items).toHaveLength(1)
  })
})
