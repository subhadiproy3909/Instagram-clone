const mongoose = require('mongoose');


const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    
    follower: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    following:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    savedPost: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    }],
}, 
    { timestamps: true}
);


module.exports = mongoose.model("Profile", profileSchema);