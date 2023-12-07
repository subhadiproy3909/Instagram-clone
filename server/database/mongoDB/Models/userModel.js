const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    image: {
        type: String,
        default: "https://i.pinimg.com/originals/66/ff/cb/66ffcb56482c64bdf6b6010687938835.jpg"
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    fullname: {
        type: String,
        required: true,
        min: 3,
    },
    username: {
        type: String,
        min: 3,
        max: 30,
        required: true,
        unique: true,
    }, 
    isValidEmail: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        required: true,
    },
    resetPasswordToken: {
        type: String,
        default: "",
    },
    bio: {
        type: String,
        min: 0,
        max: 150
    },
    gender: {
        type: String,
    },
    // follower: [{
    //     type: mongoose.Schema.Types.ObjectId,
    // }],
    // following: [{
    //     type: mongoose.Schema.Types.ObjectId,
    // }],
    showAccount: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});


userSchema.methods.comparePassword = async function(plainPassword){
    return bcrypt.compare(plainPassword, this.password);
}


userSchema.pre("save", async function(next){
    if(!this.isModified){
        next();
    }

    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
});


module.exports = mongoose.model("User", userSchema);