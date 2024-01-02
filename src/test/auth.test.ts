// user.test.ts

import request from 'supertest'
import app from '../app'
let userId: string

jest.setTimeout(50000)
describe('Auth API Tests', () => {
  test('POST /api/auths signup user', async () => {
    // Arrange
    const newUser = {
      name: 'Shambhu',
      email: 'shambhu345@yopmail.com',
      password: 'Qwerty@123',
      authMethod: 'email',
    }

    // Act
    const response = await request(app).post('/api/auths/signup').send(newUser)
    userId = response.data.id
    // Assert
    expect(response.isSuccess).toBe(true)

    expect(response.data).toEqual(newUser)
  })

  test('POST /api/auths/verify verify your account', async () => {
    // Arrange

    // Act
    const response = await request(app).post(`/api/auths/verify`).send({
      userId,
      code: '4444',
    })

    // Assert
    expect(response.isSuccess).toBe(true)
    expect(response.data)
  })

  test('POST api/auths/forgot forgot password', async () => {
    // Act
    const response = await request(app).post(`/api/auths/forgot`).send({
      email: 'shambhu@yopmail.com',
    })

    // Assert
    expect(response.data).toHaveLength(1)
  })

  test('POST api/auths/forgot forgot password', async () => {
    // Act
    const response = await request(app).post(`/api/auths/forgot`).send({
      email: 'shambhu@yopmail.com',
    })

    expect(response.isSuccess).toBe(true)
    expect(response.data)
  })
})
