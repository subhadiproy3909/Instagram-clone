const router = require('express').Router();


// local modules.
const Profile = require('../database/mongoDB/Models/profileModel');
const {userSignup, userLogin, userAuth, updateAccount, userLogout, resetPassWordRequest, resetPassword} = require('./controllers/user');
const auth = require("../middlewares/authMiddleware");
const upload = require("./services/multer");


router.post('/signup', userSignup);

router.post('/login', userLogin);

router.get('/auth/check', userAuth)
    .patch("/update", upload.single("file"), auth, updateAccount)
    .get('/logout', auth, userLogout)
    .patch('/forget/password', resetPassWordRequest)
    .patch('/password/reset?email=', resetPassword);


module.exports = router;