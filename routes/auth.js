const { default: mongoose } = require("mongoose");
const collection = require("../models/userModel");
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const e = require("express");

const User = mongoose.model("Demo");

//posting data in mongodb
router.post("/register", async(req,res, next) => {
  try{
    const user = await User.create({
        firstname:req.body.firstName,
        lastname:req.body.lastName,
        email:req.body.email,
        password:req.body.password
    });
    const { id, firstname, lastname, email, password } = user;
    const token = jwt.sign({ id, email }, process.env.SECRET);

    return res.status(201).json({
      id,
      email,
      token,
    });
  }catch (err) {
    if (err.code === 11000) {
      err.message = 'Sorry, that username is already taken';
    }
    return next({
      status: 400,
      message: err.message,
    })
  }
});

router.post("/login", async(req,res, next)  => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    const { id, email } = user;
    const valid = await user.comparePassword(req.body.password);

    if (valid) {
      const token = jwt.sign({ id, email }, process.env.SECRET);
      return res.status(200).json({
        id,
        email,
        token,
      });
    } else {
      throw new Error();
    }
  } catch (err) {
    console.log(err);
    return next({ status: 400, message: 'Invalid Username/Password' });
  }
});

//fetching data from mongodb
router.post("/getuser", async(req,res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if(user){
      const { id, email } = user;
      console.log(email)
      return res.json({
        status: 'notok'
      });
    }else{
      return res.json({
        status: 'ok'
      });
    }
    
  } catch (err) {
    console.log(err);
    return next({ status: 400, message: 'Invalid Username/Password' });
  }
});

module.exports = router
