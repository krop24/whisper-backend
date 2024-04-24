import dotenv from 'dotenv'
import express from 'express'
import fs from 'fs'
import routesConfig from './src/config/routes.js'
import { AuthController } from './src/controllers/auth.controller.js'
import { connectDB } from './src/config/db.js'
import { createSocket } from './src/config/socket.js'

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
  if (route.private) {
    app.use(route.path, AuthController.checkSession, route.router)
  } else {
    app.use(route.path, route.router)
  }
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})

connectDB()
createSocket(process.env.SOCKET_PORT)
