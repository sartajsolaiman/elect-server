const { default: mongoose } = require("mongoose");
const collection = require("../models/userModel");
const router = require('express').Router();

const user = mongoose.model("Demo");

//posting data in mongodb
router.post("/register", async(req,res) => {
  const{firstName, lastName, email, password} = req.body;
  try{
    await user.create({
        firstname:firstName,
        lastname:lastName,
        email:email,
        password:password
    });
    res.send({status:"Ok"});
  }catch(error){
    res.send({status:"error"});
  }
});

//fetching data from mongodb
router.get("/getUser", async(req,res) => {
  try {
    const alluser = await user.find({});
    res.send({status:"Ok", data:alluser})
  } catch (error) {
    console.log(error);
  }
});

module.exports = router
