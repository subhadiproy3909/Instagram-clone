const crypto = require('crypto');

const User = require('../../database/mongoDB/Models/userModel');
const Profile = require('../../database/mongoDB/Models/profileModel');
const generateToken = require('../services/generateToken');
const { sendMail } = require('../services/sendMail');


const userSignup = async (req, res) => {
    try {
        console.log(req.body);
        const { email, fullname, username, password } = req.body;

        const isExists = await User.findOne({ email: email });

        if (isExists) {
            return res.json({ message: "Account already exists. Please try with other email" });
        }

        let user = await User.create({
            email: email, fullname: fullname, username: username, password: password,
        });

        if (user) {
            const jwtToken = generateToken(user._id);
            await Profile.create({user: user._id});
            console.log(`jwt token ${jwtToken}`);
            res.cookie("fwi_&wei&bn", jwtToken, { expires: new Date(Date.now() + (2 * 60 * 60 * 1000)), httpOnly: true, });

            res.json({
                email: user.email,
                token: jwtToken,
            });
            // const userEmail = user.email;
            // const subject = `Instagram email verification`;
            // const html = `<p>Hello ${user.fullname},</p>

            //     <p>This is to verify your email account.</p>

            //                                     <p>From,</p>
            //                                     <p>Instagram</p>`;

            // const text="this is a mail verification message";

            // const response = await sendMail({userEmail, subject, html});
            // if(response){
            //     user.isValidEmail = true;
            //     await user.save();
            //     res.json({
            //         email: user.email,
            //         token: jwtToken,
            //     });
            // }
        }
    }
    catch (error) {
        throw new Error(`signup error: ${error.message}`);
    }
}


const userLogin = async (req, res) => {
    try {
        const { email_username, password } = req.body;

        const user = await User.findOne({ email: email_username });

        if (!user) {
            return res.json({ message: "Account not found. Please signup first" });
        }

        if (user && user.comparePassword(password)) {
            const jwtToken = generateToken(user._id);
            res.cookie("fwi_&wei&bn", jwtToken, { expires: new Date(Date.now() + (2 * 60 * 60 *1000)), httpOnly: true});
            return res.json({
                email: user.email,
                token: jwtToken,
            })
        }
        else {
            return res.json({ message: "Invalid cradentials." });
        }
    } catch (error) {
        throw new Error(`login error: ${error.message}`);
    }
}

const userAuth = async (req, res) => {
    try{
        if(req.cookies['fwi_&wei&bn']){
            const user = await User.findOne(req.user);
            res.json({
                email: user.email,
            })
        }
        else{
            return res.sendStatus(500);
        }
    }
    catch(error){
        throw new Error(`user auth error: ${error}`);
    }
}

// todo: add multer and change this api accordingly.
const updateAccount = async (req, res) => {
    try {
        const reqBody = req.body;

        const account = await User.findByIdAndUpdate(req.user, reqBody, { new: true });

        if (account) {
            return res.json(account);
        }
        else {
            return res.sendStatus(500);
        }
    }
    catch (error) {
        throw new Error(`update account error: ${error}`);
    }
}

const userLogout = async (req, res) => {
    try {
        res.cookie("fwi_&wei&bn", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        }).sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
        throw new Error(error.stack);
    }
}


//  todo: send reset password mail and generate token by crypto;
const resetPassWordRequest = async (req, res) => {
    try {
        const email = req.body.email;

        const resetToken = crypto.randomBytes(48).toString("hex");
        const user = await User.findOneAndUpdate({email: email}, {$set: {resetPasswordToken: resetToken}});

        if(user){
            const resetPage = `http://localhost:3000/reset-password?token=${resetToken}&email=${email}`;
            const subject = `Reset password for E-commerce throught gmail: ${email}`;
            const html = `<p> Click below link to reset password</p>
            <a href='${resetPage}'> Reset Password Link </a>`;
            const userEmail = email;
    
            // const text="this a password reset link";

            if(email){
                const response = await sendMail({userEmail, subject, html});

                if(response){
                    res.json(response);
                }
            }
        }
    } catch (error) {
        throw new Error("reset password request error: ", error);
    }
}


const resetPassword = async (req, res) => {
    try {
        const { email, password, resetPasswordToken } = req.body;

        // const user = await User.findOne({ _id: req.user, resetPasswordToken: resetPasswordToken });

        const user = await User.findOneAndUpdate(
            {
                email: email, resetPasswordToken: resetPasswordToken
            },
            {
                $set: {
                    password: password, resetPasswordToken: "",
                }
            }
        );

        if (user) {
            return res.json(user);
        }
        else {
            return res.sendStatus(500);
        }
    } catch (error) {
        throw new Error(`reset passwrod error: ${error}`);
    }
}



module.exports = { userSignup, userLogin, userAuth, updateAccount, userLogout };