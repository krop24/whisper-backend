import path from 'path'

export const checkFileType = (
  file,
  cb,
  filetypes = /jpeg|jpg|png/,
  error = 'Error: Incorrect image format',
) => {
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb(error)
  }
}

export const getUniqueSuffix = () => Date.now() + '-' + Math.round(Math.random() * 1e9)

export const convertToMB = size => size * 1024 * 1024
