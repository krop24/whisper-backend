import express from 'express'
import { UserController } from '../controllers/user-controller.js'

const userRoutes = express.Router()

/*
 * @route get /api/profile/:username
 * */
userRoutes.get('/profile/:username', UserController.getUser)

/*
 * @route patch /api/profile/:username
 *
 * */
userRoutes.patch('/profile/:username', UserController.updateUser)

export default userRoutes
