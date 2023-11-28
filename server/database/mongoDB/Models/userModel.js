const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    image: {
        type: String,
        default: "https://instagram.fdad1-2.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fdad1-2.fna.fbcdn.net&_nc_cat=1&_nc_ohc=6dmGEQDcv_4AX-Pd7F2&edm=AA0lj5EBAAAA&ccb=7-5&oh=00_AfDGa4Rr5i1lgDtY0JhluG5DkinZXQAjaMyqoN4kP3rH1g&oe=65557B0F&_nc_sid=0a490e"
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