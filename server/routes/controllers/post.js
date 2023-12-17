const Post = require('../../database/mongoDB/Models/postModel');
const Profile = require("../../database/mongoDB/Models/profileModel");


const fetchFollowingUsersPosts = async (req, res) => {
    try {
        const user = req.params.id;
        const followingUser = await Profile.findOne({ user: user }).select("following -_id");

        const posts = await Post.find({ "owner": { $in: followingUser.following } })
                        .populate("owner", "_id image username")
                        .populate("comment.user", "_id image username")
                        .populate("like", "_id image username")
                        .sort({"createdAt": -1});

        // console.log(posts);
        res.json(posts);
    } catch (error) {
        console.log(error);
    }
}



module.exports = {fetchFollowingUsersPosts};