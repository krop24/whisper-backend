import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import fs from 'fs'

dotenv.config()

const app = express()
const PORT = process.env.port || 3000

const dir = './public/uploads'

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true })
}

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(err => {
    console.log(err)
  })

app.use(express.json())
app.use('/uploads', express.static('public/uploads'))

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
