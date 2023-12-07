const router = require("express").Router();

const {searchUser} = require("./controllers/common");
const auth = require('../middlewares/authMiddleware');


router.get('/search', auth, searchUser)


module.exports = router;