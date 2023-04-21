//importing express and keeping into express class
const express = require("express");
require('dotenv').config()


//creating express instance into app 
const app = express();

const cors = require('cors');

app.use(cors());

//importing mongoose and body parser
const mongoose = require("mongoose");
const routeAuth = require("./routes/auth");
const routePoll = require("./routes/poll");
const bodyParser = require("body-parser");
const sendMail = require("./middlewares/sendMail");
const confirmMail = require("./middlewares/confirmMail");
const jwt = require('jsonwebtoken');
const User = mongoose.model("Demo");

let confrimation = false;

//connecting mongodb
main()
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb+srv://SartajSolaiman:iamssd221B@cluster0.ly1vndf.mongodb.net/test");
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use('/api/auth',routeAuth);
app.use('/api/poll',routePoll);
app.use('/api/mail/',sendMail);



app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    success: false,
    error: {
      message: err.message || 'Something went wrong.',
    },
  });
});


//port access using app listen and opening server
app.listen(process.env.PORT,() => console.log("server listening into http://localhost:"+process.env.PORT));


