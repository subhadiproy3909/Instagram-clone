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

const updateFollowing = async (req, res) => {
    try {
        const user = await Profile.findOne({ user: req.user });
        const otherProfile = await Profile.findOne({ user: req.body.id });

        // console.log(user.following.includes(req.body.id));

        if (req.user._id !== req.body.id) {
            if (!user.following.includes(req.body.id)) {
                await user.updateOne({ $push: { following: req.body.id } });
                await otherProfile.updateOne({ $push: { follower: req.user._id } });
            }
            else {
                await user.updateOne({ $pull: { following: req.body.id } });
                await otherProfile.updateOne({ $pull: { follower: req.user._id } });
            }
        }

        if (user && otherProfile) {
            const data = await Profile.findOne({ user: req.body.id })
                .populate("follower", "_id image fullname username");
            return res.json(data.follower);
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

        if (userProfile) {
            const data = await Profile.findOne({ user: user })
                .populate("savedPost");
            res.json(data.savedPost);
        }
    }
    catch (error) {
        console.log(`save post error: ${error}`);
    }
}

const fetchProfile = async (req, res) => {
    try {
        const id = req.params.userId;
        // console.log(req.params);

        const profile = await Profile.findOne({ user: id })
            .populate("user", "_id image fullname username bio gender showAccount")
            .populate("follower", "_id image fullname bio username")
            .populate("following", "_id image fullname bio username")
            .populate("savedPost")


        if (profile) {
            return res.json({
                profile: profile,
            });
        }
        else {
            return res.sendStatus(500);
        }
    } catch (error) {
        // throw new Error(`fetch profile error: ${error}`);
        console.warn(`fetch profile error: ${error}`);
        return;
    }
}

const followSuggestion = async (req, res) => {
    try {
        const user = req.user._id;

        const suggestion = await Profile.find(
            { 
                $and: [{ "user": { $ne: user } }, { "follower": { $ne: user } }] //{ "follower": { $ne: user } 
            }
        )
        .limit(5)
        .populate("user", "_id image fullname bio username")
        .populate("follower", "_id image fullname bio username")
        .populate("following", "_id image fullname bio username");

        if (suggestion) {
            res.json(suggestion);
        }
    } 
    catch (error) {
        console.warn(`follow suggestion error: ${error}`);
    }
}


module.exports = { addRemoveFollowers, updateFollowing, savePostInProfile, fetchProfile, followSuggestion };