const router = require('express').Router();


// local modules.
const Profile = require('../database/mongoDB/Models/profileModel');
const {userSignup, userLogin, userAuth, updateAccount, userLogout} = require('./controllers/user');
const auth = require("../middlewares/authMiddleware");


router.post('/signup', userSignup);

router.post('/login', userLogin);

router.get('/auth/check', userAuth);


module.exports = router;