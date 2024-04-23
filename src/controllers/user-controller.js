import User from '../models/user.js'
import { isValidField } from '../utils/helpers/validation.js'
import { getRequestData } from '../utils/helpers/http.js'

export class UserController {
  static getUser(req, res) {
    const { username } = getRequestData(req)

    if (!isValidField(username)) {
      return res.status(404).json({ message: 'User not found' })
    }

    User.findOne({ username }).then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      res.json(user)
    })
  }

  static updateUser(req, res) {
    const { username, firstName, lastName, photo } = getRequestData(req)

    const requiredFields = [firstName, lastName]
    const hasAllFields = requiredFields.every(isValidField)

    if (hasAllFields === false) {
      return res.status(400).json({ message: 'Please fill out all fields' })
    }

    User.findOneAndReplace({ username }, { firstName, lastName, photo }).then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      res.json(user)
    })
  }
}
