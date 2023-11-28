const jwt = require("jsonwebtoken");


const User = require('../database/mongoDB/Models/userModel');

const auth = async (req, res, next) => {
    try{

        if(req && req.cookies){
            console.log(req.cookies["fwi_&wei&bn"]);
            const token = req.cookies["fwi_&wei&bn"];
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            
            console.log(decoded.id);
            const user = await User.findById(decoded.id).select('_id');
    
            req.user = user;
            next();
        }
    }
    catch(error){
        throw new Error(`auth middleware error: ${error}`);
    }
}


module.exports = auth;