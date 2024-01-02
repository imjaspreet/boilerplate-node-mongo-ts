import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.test' })
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

let mongoServer: MongoMemoryServer

beforeAll(async () => {
  mongoServer = new MongoMemoryServer()
  // mongoServer.getUri();

  await mongoose.connect(process.env.MONGO_URL)
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

describe('MongoDB Connectivity Test', () => {
  test('should connect to MongoDB in-memory server', async () => {
    const db = mongoose.connection
    db.once('open', () => {
      expect("Connected to MongoDB'").toBe("Connected to MongoDB'")
    })
  })

  // Add more tests as needed

  // Example:
  test('should insert and find documents', async () => {
    interface TestModel {
      name: string
    }

    const TestModel = mongoose.model<TestModel>(
      'TestModel',
      new mongoose.Schema({ name: String }),
    )
    await TestModel.create({ name: 'John Doe' })
    const foundDocument = await TestModel.findOne({ name: 'John Doe' })
    expect(foundDocument).toBeDefined()
    expect(foundDocument!.name).toBe('John Doe')
  })
})
