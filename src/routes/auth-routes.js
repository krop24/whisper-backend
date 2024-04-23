import express from 'express'
import passport from 'passport'
import { passportConfig } from '../config/passport.js'
import { AuthController } from '../controllers/auth-controller.js'

const authRoutes = express.Router()

passportConfig(passport)

/*
 * @route POST /api/auth/register
 * */
authRoutes.post('/register', AuthController.register)

/*
 * @route POST /api/auth/login
 * */
authRoutes.post('/login', AuthController.login)

export default authRoutes
