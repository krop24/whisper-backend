import express from 'express'
import { ChatController } from '../controllers/chat.controller.js'

const chatRoutes = express.Router()

/*
 * @route post /api/chat
 * */
chatRoutes.post('/chat', ChatController.createChat)

/*
 * @route post /api/chat/:id
 * */
chatRoutes.get('/chat/:id', ChatController.getChat)

/*
 * @route get /api/chats
 * @desc Get all chats
 * */
chatRoutes.get('/chats', ChatController.getChats)

export default chatRoutes
