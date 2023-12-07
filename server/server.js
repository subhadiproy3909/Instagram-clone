require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();


// local modules.
const configDB = require('./database/mongoDB/config');


configDB();


const port = process.env.PORT || 8080;

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());
app.use(cors());


// routing middleware.
app.use('/common', require('./routes/commonRouter'));
app.use('/user', require('./routes/userRouter'));
app.use('/post', require('./routes/postRouter'));
app.use('/profile', require('./routes/profileRouter'));



app.listen(port, () =>{
    console.log("Running at port no.", port);
});

