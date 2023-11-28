const jwt = require('jsonwebtoken');


const generateToken = (id) => {
    try {
        const token = jwt.sign({id}, process.env.SECRET_KEY);

        return token;
    } catch (error) {
        throw new Error(`generate token error: ${error.message}`);
    }
}


module.exports = generateToken;