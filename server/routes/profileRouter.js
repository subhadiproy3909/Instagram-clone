const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const {addRemoveFollowers, updateFollowing, savePostInProfile, fetchProfile} = require('./controllers/profile');

router.patch('/follower', auth, addRemoveFollowers)
    .patch('/following', auth, updateFollowing)
    .patch('/save/post', auth, savePostInProfile)
    .get('/:userId', auth, fetchProfile);



module.exports = router;