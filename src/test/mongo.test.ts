import { setGlobalEnvironment } from '../global'
import Environment from '../environments/environment'
const env: Environment = new Environment()
setGlobalEnvironment(env)
import mongoose, { Connection } from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

let mongoServer: MongoMemoryServer
let mongoConnection: Connection

// Set up a MongoDB in-memory server before all tests
beforeAll(async () => {
  mongoServer = new MongoMemoryServer()
  mongoConnection = await mongoose.connect(env.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
})

// Clean up and close the MongoDB in-memory server after all tests
afterAll(async () => {
  await mongoConnection.disconnect()
  await mongoServer.stop()
})

describe('MongoDB Connectivity Test', () => {
  test('should connect to MongoDB in-memory server', async () => {
    expect(mongoConnection.readyState).toBe(1) // 1 means connected
  })

  // Add more tests as needed

  // Example:
  test('should insert and find documents', async () => {
    interface TestModel {
      name: string
    }

    const TestModel = mongoConnection.model<TestModel>(
      'TestModel',
      new mongoose.Schema({ name: String }),
    )
    await TestModel.create({ name: 'John Doe' })
    const foundDocument = await TestModel.findOne({ name: 'John Doe' })
    expect(foundDocument).toBeDefined()
    expect(foundDocument!.name).toBe('John Doe')
  })
})
