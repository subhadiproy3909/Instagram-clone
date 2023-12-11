const router = require('express').Router();
const multer = require('multer');



const Post = require('../database/mongoDB/Models/postModel');
const Profile = require('../database/mongoDB/Models/profileModel');
const auth = require("../middlewares/authMiddleware");
const uploadOnCloudinary = require("./services/fileUpload");

// content.

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, res, cb) => {
            return cb(null, "./uploads/");
        },
        filename: (req, file, cb) => {
            return cb(null, `${Date.now()}_${file.originalname}`);
        }
    })
})

router.post("/create", auth, upload.single("file"),async (req, res) => {
    try {

        const owner = req.user;
        const caption = req.body.caption;
        const response = await uploadOnCloudinary(req.file.path);

        const post = await Post.create({owner: owner, content: response.url, comment: {user: owner, message: caption}});

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

router.get("/fetch/:id", async (req, res) => {
    try {
        const post = await Post.find({owner: req.params.id})
            .populate("owner", "_id image username")
            .populate("comment.user", "_id image username")
            .populate("like", "_id image username")
            .sort({createdAt: -1});

        if (post) {
            // console.log(post);
            return res.json(post);
        }
        else {
            return res.sendStatus(500);
        }
    }
    catch (error) {
        // throw new Error(`fetch comment error: ${error}`);
        console.warn(`fetch comment error: ${error}`);
        return;
    }
})
router.get("/fetch/selected/post/:id", auth, async (req, res) => {
    try {
        const postId = req.params.id;

        const post = await Post.findOne({ _id: postId })
            .populate("owner", "_id image username")
            .populate("comment.user", "_id image username")
            .populate("like", "_id image username");

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

router.patch("/comment/add", auth, async (req, res) => {
    try {
        const { postId, message } = req.body;
        console.log(`postId: ${postId}, message: ${message}`);

        let post = await Post.updateOne(
            {
                _id: postId,
            }
            ,
            {
                $push: { comment: { user: req.user, message: message } }
            }
        );
        if (post) {
            const fetchPost = await Post.findById(postId)
                            .populate("owner", "_id image username").populate("comment.user", "_id image username");
            return res.json(fetchPost.comment);
        }
        else {
            return res.sendStatus(500);
        }
    } catch (error) {
        throw new Error(`add comment error: ${error}`);
    }
});

router.get("/comment/fetch/:id", auth, async (req, res) => {
    try{
        const postId = req.params.id;
        console.log(postId);

        const post = await Post.findById(postId).select("comment").populate("comment.user", "_id image username fullname");

        if(post){
            return res.json(post);
        }
        else{
            return res.sendStatus(500);
        }
    }
    catch(error){
        throw new Error(`fetch comment error: ${error}`);
    }
})


// todo : change like feature.
router.patch("/like", auth, async (req, res) => {
    try {
        const postId = req.body.id;

        const post = await Post.findOne({_id: postId});
        console.log(post.like.includes(req.user._id));

        if(!post.like.includes(req.user._id)){
            await post.updateOne({ $push: { like: req.user._id } });
        }
        else{
            await post.updateOne( { $pull: { like: req.user._id } } );
        }

        if (post) {
            const data = await Post.findById(postId).populate("like", "_id image username fullname");
            console.log(data.like);
            return res.json(data.like);
        }
        else{
            return res.sendStatus(500);
        }
    }
    catch (error) {
        throw new Error(`add like error: ${error}`);
    }
});


// add saved post feature.



module.exports = router;