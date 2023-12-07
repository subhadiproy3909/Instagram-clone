const Profile = require('../../database/mongoDB/Models/profileModel');
const Post = require("../../database/mongoDB/Models/postModel");

const addRemoveFollowers = async (req, res) => {
    try {
        const user = await Profile.findById(req.user);
        const otherProfile = await Profile.findById(req.body.user);

        if (req.params.id !== req.body.user) {
            if (!user.follower.includes(req.body.user)) {
                await user.updateOne({ $push: { follower: req.body.user } });
                await otherProfile.updateOne({ $push: { following: req.user } });

                return res.json({ message: "Profile following" });
            }
            else {
                await user.updateOne({ $pull: { follower: req.body.user } });
                await otherProfile.updateOne({ $pull: { following: req.user } });

                return res.json({ message: "Profile unfollowing" });
            }
        }
    }
    catch (error) {
        throw new Error(`add followers error: ${error}`);
    }
}

const addRemoveFollowing = async (req, res) => {
    try {
        const user = await Profile.findOne({ user: req.user });
        const otherProfile = await Profile.findOne({ user: req.body.user });

        if (req.params.id !== req.body.user) {
            if (!user.following.includes(req.body.user)) {
                await user.updateOne({ $push: { following: req.body.user } });
                await otherProfile.updateOne({ $push: { follower: req.user } });

                return res.json({ message: "user has followed" })
            }
            else {
                await user.updateOne({ $pull: { following: req.body.user } });
                await otherProfile.updateOne({ $pull: { follower: req.user } });

                return res.json({ message: "user has unfollowed" });
            }
        }

    }
    catch (error) {
        res.sendStatus(500);
        throw new Error(`following error: ${error}`);
    }
}

const savePostInProfile = async (req, res) => {
    try {
        const user = req.user;
        const postId = req.body.id;

        const userProfile = await Profile.findOne({ user: user });
        console.log(`saved post ${userProfile.savedPost.includes(postId)}`)
        if (!userProfile.savedPost.includes(postId)) {
            await userProfile.updateOne({ $push: { savedPost: postId } });
        }
        else {
            await userProfile.updateOne({ $pull: { savedPost: postId } });
        }

        if(userProfile){
            const data = await Profile.findOne({user: user}).select("post");
            res.json(data);
        }
    }
    catch (error) {
        console.log(`save post error: ${error}`);
    }
}

const fetchProfile = async (req, res) => {
    try {
        const id = req.params.userId;

        const profile = await Profile.findOne({ user: id }).populate("user", "image fullname username showAccount");

        const posts = await Post.find({ owner: id })
            .populate("owner", "_id image username")
            .populate("comment.user", "_id image username");

        if (profile && posts) {
            return res.json({
                profile: profile,
                posts: posts,
            });
        }
        else {
            return res.sendStatus(500);
        }
    } catch (error) {
        throw new Error(`fetch profile error: ${error}`);
    }
}


module.exports = { addRemoveFollowers, addRemoveFollowing, savePostInProfile, fetchProfile };