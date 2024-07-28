import multer from 'node_modules/multer'
import '@types/multer'
var path = require('path')
var attachmentStorage = multer.diskStorage({    
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now().toString())
    }
})

var avatarStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'avatars/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now().toString() + path.extname(file.originalname))
    }
})

export const uploadAttachment = multer({
    storage: attachmentStorage,
})
export const uploadAvatar = multer({
    storage: multer.memoryStorage(),
})

