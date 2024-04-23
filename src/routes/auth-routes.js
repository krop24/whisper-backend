import express from 'express'
import passport from 'passport'
import { passportConfig } from 'src/config/passport'
import User from 'src/models/user'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router = express.Router()

passportConfig(passport)

/*
 * @route POST /api/register
 * */
router.post('/register', (req, res) => {
  const { username, email, password, firstName, lastName, photo } = req.body

  User.findOne({ email }).then(user => {
    if (user) {
      return res.status(400).json({ message: 'Email already exists' })
    }

    const newUser = new User({
      username,
      email,
      password,
      firstName,
      lastName,
      photo,
    })

    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err

      newUser.password = hash

      newUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err))
    })
  })
})

/*
 * @route POST /api/login
 * */

router.post('/login', (req, res) => {
  const { username, password } = req.body

  User.findOne({ username }).then(user => {
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          username: user.username,
        }

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: 'Bearer ' + token,
          })
        })
      } else {
        return res.status(400).json({ message: 'Password incorrect' })
      }
    })
  })
})

export { router }
