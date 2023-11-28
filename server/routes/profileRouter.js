const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const {addRemoveFollowers, addRemoveFollowing, savePostInProfile, fetchProfile} = require('./controllers/profile');

router.patch('/follower', auth, addRemoveFollowers)
    .patch('/following', auth, addRemoveFollowing)
    .patch('/save/post', auth, savePostInProfile)
    .get('/fetch', auth, fetchProfile);



module.exports = router;