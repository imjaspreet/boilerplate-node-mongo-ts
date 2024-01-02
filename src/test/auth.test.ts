// user.test.ts

import request from 'supertest'
import app from '../app'
let userId
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
    userId = response._id
    // Assert
    expect(response.status).toBe(201)

    expect(response.body).toEqual(newUser)
  })

  test('POST /api/auths/verify verify your account', async () => {
    // Arrange
    const userName = 'ali' // Part of the user name 'Alice'

    // Act
    const response = await request(app).post(`/api/auths/verify`).send({
      userId,
      code: '4444',
    })

    // Assert
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(1)
    expect(response.body[0].name.toLowerCase()).toContain(
      userName.toLowerCase(),
    )
  })

  test('POST api/auths/login login user', async () => {
    // Act
    const response = await request(app).post(`/api/auths/login`).send({
      email: 'shambhu345@yopmail.com',
      password: 'Qwerty@123',
      deviceType: 'ios',
      fcmToken: 'dshdjsdgj',
    })

    // Assert
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(1)
  })
  test('POST api/auths/forgot forgot password', async () => {
    // Act
    const response = await request(app).post(`/api/auths/forgot`).send({
      email: 'shambhu@yopmail.com',
    })

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(1)
  })
})
