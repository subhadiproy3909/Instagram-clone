const User = require("../../database/mongoDB/Models/userModel");

const searchUser = async (req, res) => {
    try {
        const { searchReq } = req.query;

        if (searchReq === "") {
            return res.json([]);
        }

        const users = await User.find(
            {
                username: { $regex: searchReq, }
            }
        ).select("_id image username fullname");

        if (users) {
            return res.json(users);
        }
    }
    catch (error) {
        throw new Error(error);
    }
}


module.exports = { searchUser };

