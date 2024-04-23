import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import fs from 'fs'
import routesConfig from './src/config/routes.js'

dotenv.config()

const app = express()
const PORT = process.env.port || 3000

const dir = './public/uploads'

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true })
}

app.use(express.json())
app.use('/uploads', express.static('public/uploads'))

routesConfig.forEach(route => {
  app.use(route.path, route.router)
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(err => {
    console.log(err)
  })
