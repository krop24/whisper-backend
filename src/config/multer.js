import multer from 'multer'
import { checkFileType, convertToMB, getUniqueSuffix } from 'src/utils/helpers/file'
import path from 'path'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads')
  },
  filename: (req, file, cb) =>
    cb(
      null,
      file.fieldname + '-' + getUniqueSuffix() + '.' + path.extname(file.originalname),
    ),
})

export const uploadImg = multer({
  storage,
  limits: {
    fileSize: convertToMB(2),
  },
  fileFilter: (req, file, cb) => checkFileType(file, cb),
})
