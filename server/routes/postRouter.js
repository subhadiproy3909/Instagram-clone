const router = require('express').Router();



const Post = require('../database/mongoDB/Models/postModel');
const Profile = require('../database/mongoDB/Models/profileModel');
const auth = require("../middlewares/authMiddleware");

// content.

router.post("/create", auth, async (req, res) => {
    try {
        const owner = req.user;
        let { content } = req.body;

        const post = await Post.create({owner, content});

        if (post) {
            return res.json(post);
        }
        else {
            return res.json(500);
        }
    }
    catch (error) {
        throw new Error(`create post error: ${error}`);
    }
});

router.delete("/remove:id", auth, async (req, res) => {
    try {
        const { id } = req.query;

        const post = await Post.findOneAndDelete({_id: id, owner: req.user});

        if (post) {
            return res.sendStatus(200);
        }
        else {
            return res.sendStatus(500);
        }
    }
    catch (error) {
        throw new Error(`remove post error: ${error}`);
    }
});

router.get("/fetch/:username", auth, async (req, res) => {
    try {
        const post = await Post.find()
            .populate("owner", "_id image username")
            .populate("comment.user", "_id image username");

        if (post) {
            return res.json(post);
        }
        else {
            return res.sendStatus(500);
        }
    }
    catch (error) {
        throw new Error(`fetch comment error: ${error}`);
    }
})
router.get("/fetch/selected/post", auth, async (req, res) => {
    try {
        const postId = req.query.id;

        const post = await Post.findById(postId)
            .populate("owner", "_id image username")
            .populate("comment.user", "_id image username");

        if (post) {
            return res.json(post);
        }
        else {
            return res.sendStatus(500);
        }
    }
    catch (error) {
        throw new Error(`fetch comment error: ${error}`);
    }
})

router.post("/comment/add", auth, async (req, res) => {
    try {
        const { postId, message } = req.body;

        const post = await Post.findById(postId);

        post.comment.push({ user: req.user, message: message });

        await post.save();
        if (post) {
            return res.json(post);
        }
        else {
            return res.sendStatus(500);
        }
    } catch (error) {
        throw new Error(`add comment error: ${error}`);
    }
});


// todo : change like feature.
router.patch("/like", async (req, res) => {
    try {
        const postId = req.query.id;

        const likes = await Post.findById(postId).select("like");

        ++likes.like;

        await likes.save();

        if (likes) {
            res.json(likes);
        }
    }
    catch (error) {
        throw new Error(`add like error: ${error}`);
    }
});


// add saved post feature.



module.exports = router;