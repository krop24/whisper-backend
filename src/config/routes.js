import authRoutes from '../routes/auth.routes.js'
import userRoutes from '../routes/user.routes.js'
import chatRoutes from '../routes/chat.routes.js'

export default [
  {
    path: '/api/auth',
    router: authRoutes,
    private: false,
  },
  {
    path: '/api/user',
    router: userRoutes,
    private: true,
  },
  {
    path: '/api',
    router: chatRoutes,
    private: true,
  },
]
