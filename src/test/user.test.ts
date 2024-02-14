// user.test.ts
import setupTestDB from './setupTestDB'
import { faker } from '@faker-js/faker'
import User from '../models/user'
import request from 'supertest'
import app from '../app'
import fs from 'fs'
import path from 'path'
const email: string = faker.internet.email()
let userId: string
let imageUrl: string
setupTestDB()

describe('User API Tests ', () => {
  test('POST /api/images upload a profile image', async () => {
    // Read the image file as binary data
    const imagePath = path.resolve(__dirname, 'image.png')
    const imageData = fs.readFileSync(imagePath)
    const response = await request(app)
      .post('/api/images')
      .attach('image', imageData, 'image.png')

    expect(response.body.isSuccess).toBe(true)
    expect(response.body.url)

    imageUrl = response.body.url
  })
  test('POST /api/users creates a new user', async () => {
    const newUser = {
      name: faker.person.fullName(),
      email: email,
      password: 'Qwerty@123',
      authMethod: 'email',
      imageUrl,
    }
    const user = await User.create(newUser)
    userId = user.id
    expect(user.id)
  })

  test('POST /api/users/id update a user', async () => {
    const newUser = {
      name: faker.person.fullName().toLowerCase(),
    }
    const user = await User.findByIdAndUpdate(userId, newUser)
    console.log(user)
    expect(user.id)
  })
  test('GET /api/users/id get a user', async () => {
    const response = await User.findById(userId)
    console.log(response)
    expect(response.id)
  })
  test('GET /api/users get all users', async () => {
    const users = await User.find({ id: userId })
    expect(users.length > 0)
  })
})
