// user.test.ts

import request from 'supertest'
import app from '../index'
import { faker } from '@faker-js/faker'
let userId: string
const email: string = faker.internet.email()
describe('Auth API Tests', () => {
  test('POST /api/auths signup user', async () => {
    // Arrange
    const newUser = {
      email,
      password: 'Qwerty@123',
      authMethod: 'email',
    }

    // Act
    const response = await request(app).post('/api/auths/signup').send(newUser)
    // Assert
    expect(response.body.isSuccess).toBe(true)
    userId = response.body.data.id

    // expect(response.body.data).toEqual(newUser)
  })

  test('POST /api/auths/verify verify your account', async () => {
    // Arrange

    // Act
    const response = await request(app).post(`/api/auths/verify`).send({
      userId,
      code: '4444',
    })

    expect(response.body.isSuccess).toBe(true)
    expect(response.body)
  })

  test('POST api/auths/forgot forgot password', async () => {
    // Act
    const response = await request(app).post(`/api/auths/forgot`).send({
      email,
    })

    // Assert
    expect(response.body.isSuccess).toBe(true)
    expect(response.body)
  })

  test('POST api/auths/forgot forgot password', async () => {
    // Act
    const response = await request(app).post(`/api/auths/forgot`).send({
      email,
    })

    expect(response.body.isSuccess).toBe(true)
    expect(response.body)
  })
})
