// user.test.ts
import setupTestDB from './setupTestDB'
import request from 'supertest'
import app from '../app'
import { faker } from '@faker-js/faker'
const email: string = faker.internet.email()
let userId: string
let accessToken: string
setupTestDB()

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
  })

  test('POST verify account', async () => {
    const response = await request(app)
      .post('/api/auths/verify')
      .send({ userId, code: '4444' })
    expect(response.body.isSuccess).toBe(true)
  })

  test('POST login', async () => {
    const response = await request(app).post('/api/auths/login').send({
      email,
      password: 'Qwerty@123',
      deviceType: 'ios',
      deviceId: '1er4ttr',
    })
    expect(response.body.isSuccess).toBe(true)
    accessToken = response.body?.data?.session?.accessToken
  })

  test('POST forgot password', async () => {
    const response = await request(app)
      .post('/api/auths/forgot')
      .send({ email })
    expect(response.body.isSuccess).toBe(true)
  })

  test('POST resend otp', async () => {
    const response = await request(app).get(`/api/auths/resend/otp/${userId}`)
    expect(response.body.isSuccess).toBe(true)
  })
  test('POST reset password after verification', async () => {
    const response = await request(app)
      .put(`/api/auths/reset/${userId}`)
      .send({ password: 'Qwerty@123' })
    expect(response.body.isSuccess).toBe(true)
  })
  test('POST Change Password', async () => {
    const response = await request(app)
      .put(`/api/auths/update/password/${userId}`)
      .send({ password: 'Qwerty@123', newPassword: 'Qwerty@123' })
    expect(response.body.isSuccess).toBe(true)
  })

  test('GET Logout', async () => {
    const response = await request(app)
      .get(`/api/auths/logout/${userId}`)
      .set('x-access-token', accessToken)
    expect(response.body.isSuccess).toBe(true)
  })
})
