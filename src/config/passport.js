import { Strategy as LocalStrategy } from 'passport-local'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import bcrypt from 'bcryptjs'
import User from '../models/user.js'
import dotenv from 'dotenv'

dotenv.config()

export const passportConfig = passport => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'username',
      },
      (username, password, done) => {
        User.findOne({ username }).then(user => {
          if (!user) {
            return done(null, false, { message: 'Incorrect username' })
          }

          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err
            if (isMatch) {
              return done(null, user)
            } else {
              return done(null, false, { message: 'Incorrect password' })
            }
          })
        })
      },
    ),
  )

  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  }

  passport.use(
    new JwtStrategy(opts, (jwtPayload, done) => {
      User.findById(jwtPayload.id)
        .then(user => {
          if (user) {
            return done(null, user)
          }

          return done(null, false)
        })
        .catch(err => console.log(err))
    }),
  )
}
