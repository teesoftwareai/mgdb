import { MongoClient } from 'mongodb'

const url = process.env.MONGODB_URI || 'mongodb+srv://teesoftwareai_db_user:sAVxjJujLbYcDUHS@cluster0.mongodb.net/teesoftwareai_db'

let db

export const connectDB = async () => {
  if (db) return db
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  db = client.db()
  return db
}

export const getCollection = async (name) => {
  const database = await connectDB()
  return database.collection(name)
}