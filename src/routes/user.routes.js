import express from 'express'
import { UserController } from '../controllers/user.controller.js'

const userRoutes = express.Router()

/*
 * @route get /api/user/:username
 * */
userRoutes.get('/:username', UserController.getUser)

/*
 * @route patch /api/user/:username
 * @desc Update user information
 * */
userRoutes.patch('/:username', UserController.updateUser)

export default userRoutes
