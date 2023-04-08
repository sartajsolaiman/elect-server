const express = require("express");
const app = express();
const { default: mongoose } = require("mongoose");
const collection = require("../models/model");

const user = mongoose.model("Demo");

//posting data in mongodb
app.post("/register", async(req,res) => {
  const{username,password,email} = req.body;
  try{
    await user.create({
      username:username,
      password:password,
      email:email,
    });
    res.send({status:"Ok"});
  }catch(error){
    res.send({status:"error"});
  }
});

//fetching data from mongodb
app.get("/getUser", async(req,res) => {
  try {
    const alluser = await user.find({});
    res.send({status:"Ok", data:alluser})
  } catch (error) {
    console.log(error);
  }
});

