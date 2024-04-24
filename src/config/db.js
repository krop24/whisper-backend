import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to DB'))
    .catch(err => console.log(err))
}
