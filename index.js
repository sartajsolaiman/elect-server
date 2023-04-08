//importing express and keeping into express class
const express = require("express");

//creating express instance into app 
const app = express();

//importing mongoose and body parser
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("./collections/collection");

//connecting mongodb
main()
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb+srv://SartajSolaiman:iamssd221B@cluster0.ly1vndf.mongodb.net/test");
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

//port no
const PORT = 1337;

//root route access message
app.get("/", (req,res) => {
  res.send("Hello World beautiful people");
});

//about route access message
app.get("/about", (req,res) => {
    res.send("This is the about route");
})


//port access using app listen and opening server
app.listen(PORT,() => console.log("server listening into port no" + PORT));

