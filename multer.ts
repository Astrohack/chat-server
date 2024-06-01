var multer = require('./node_modules/multer')
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

var uploadAttachment = multer({
    storage: attachmentStorage,
})
var uploadAvatar = multer({
    storage: multer.memoryStorage(),
})

module.exports = {
    uploadAttachment,
    uploadAvatar,
}