// user.test.ts

import request from 'supertest'
import app from '../app'
let userId: string

jest.setTimeout(80000)
describe('User API Tests', () => {
  test('POST /api/users creates a new user', async () => {
    // Arrange
    const newUser = {
      name: 'Shambhu',
      email: 'shambhu345@yopmail.com',
      password: 'Qwerty@123',
      authMethod: 'email',
    }

    // Act
    const response = await request(app).post('/api/users').send(newUser)
    // Assert
    expect(response.body.isSuccess).toBe(true)

    userId = response.body.id
    expect(response.data).toEqual(newUser)
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
