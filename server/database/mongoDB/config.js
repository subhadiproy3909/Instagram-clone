const mongoose = require('mongoose');


const configDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_CONNECT);

        console.log(`Database connected: ${conn.connection.host}`);
    }
    catch(error){
        throw new Error(`server config error ${error}`);
    }
}


module.exports = configDB;