import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { isValidEmail, isValidField } from '../utils/helpers/validation.js'
import { getRequestData } from '../utils/helpers/http.js'

export class AuthController {
  static register(req, res) {
    const { username, email, password, firstName, lastName, photo } = getRequestData(req)

    const requiredFields = [username, email, password, firstName, lastName]
    const hasAllFields = requiredFields.every(isValidField)

    if (hasAllFields === false) {
      return res.status(400).json({ message: 'Please fill out all fields' })
    }

    const isEmailValid = isValidEmail(email)

    if (!isEmailValid) {
      return res.status(400).json({ message: 'Please enter a valid email' })
    }

    User.findOne({ email }).then(user => {
      if (user) {
        return res.status(400).json({ message: 'User already exists' })
      }

      const newUser = new User({
        username,
        email,
        password,
        firstName,
        lastName,
        photo,
      })

      const salt = 10

      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err

        newUser.password = hash

        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err))
      })
    })
  }

  static login(req, res) {
    const { username, password } = getRequestData(req)

    if (!isValidField(username) || !isValidField(password)) {
      return res.status(400).json({ message: 'Please fill out all fields' })
    }

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
  }
}
