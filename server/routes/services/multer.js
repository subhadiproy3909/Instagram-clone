const multer = require('multer');

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, res, cb) => {
            return cb(null, "./uploads");
        },
        filename: (req, file, cb) => {
            return cb(null, `${Date.now()}_${file.originalname}`);
        }
    })
});


module.exports = upload;