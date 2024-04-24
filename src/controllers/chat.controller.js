import ChatModel from '../models/chat.model.js'
import { getRequestData } from '../utils/helpers/http.js'

export class ChatController {
  static async createChat(req, res) {
    const data = getRequestData(req)

    const newChat = new ChatModel({ participants: data.participants })

    try {
      await new newChat.save()
      res.status(201).json(newChat)
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }

  static async getChats(req, res) {
    try {
      const { id } = req.user

      const chats = await ChatModel.find({ participants: id }).populate('participants')

      res.status(200).json(chats)
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }

  static async getChat(req, res) {
    try {
      const { chatId } = getRequestData(req)

      const chat = await ChatModel.find({ chat: chatId }).populate('sender', 'username')

      res.status(200).json(chat)
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }
}
