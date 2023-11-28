const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    comment: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        message: {
            type: String,
            min: 0,
            max: 1000,
        },
        createdAt: {
            type: Date,
            default: new Date(Date.now()),
        }
    }],
    like: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
}, {
    timestamps: true,
});



module.exports = mongoose.model("Post", postSchema);