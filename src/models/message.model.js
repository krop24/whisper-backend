import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
})

const MessageModel = mongoose.model('Message', messageSchema)

export default MessageModel
