import { Server } from 'socket.io'
import MessageModel from '../models/message.model.js'

export const createSocket = httpServer => {
  const io = new Server(httpServer)

  io.on('connection', socket => {
    console.log('User connected:', socket.id)

    socket.on('joinChat', chatId => {
      socket.join(chatId)
      console.log('User joined chat:', chatId)
    })

    socket.on('sendMessage', async ({ content, senderId, chatId }) => {
      const message = new MessageModel({ content, sender: senderId, chat: chatId })

      try {
        await message.save()
        io.to(chatId).emit('messageReceived', message)
      } catch (e) {
        console.error(e)
      }
    })

    socket.on('disconnect', () => console.log('User disconnected:', socket.id))
  })
}
