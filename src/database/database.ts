import mongoose from 'mongoose'

const connectToDatabase = async (MONGO_URI: string): Promise<void> => {
  try {
    mongoose.connect(MONGO_URI)

    const db = mongoose.connection

    db.on('error', console.error.bind(console, 'MongoDB connection error:'))
    db.once('open', () => {
      console.log('Connected to MongoDB')
    })
  } catch (error) {
    console.error('MongoDB connection error:', error)
  }
}

export default connectToDatabase
