// user.test.ts

import request from 'supertest'
import app from '../app'

describe('User API Tests', () => {
  test('POST /api/users creates a new user', async () => {
    // Arrange
    const newUser = { id: 1, name: 'Alice' }

    // Act
    const response = await request(app).post('/api/users').send(newUser)

    // Assert
    expect(response.status).toBe(201)
    expect(response.body).toEqual(newUser)
  })

  test('GET /api/users/:userId retrieves user details', async () => {
    // Arrange
    const userId = 1

    // Act
    const response = await request(app).get(`/api/users/${userId}`)

    // Assert
    expect(response.status).toBe(200)
    expect(response.body.id).toBe(userId)
  })

  test('GET /api/users/search retrieves matching users', async () => {
    // Arrange
    const userName = 'ali' // Part of the user name 'Alice'

    // Act
    const response = await request(app).get(
      `/api/users/search?name=${userName}`,
    )

    // Assert
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(1)
    expect(response.body[0].name.toLowerCase()).toContain(
      userName.toLowerCase(),
    )
  })
})
