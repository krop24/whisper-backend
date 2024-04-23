import { isValidObject } from './object.js'

export const getRequestData = req => {
  if (!req) return {}

  if (isValidObject(req.body)) {
    return req.body
  }

  if (isValidObject(req.query)) {
    return req.query
  }

  return req.params
}
