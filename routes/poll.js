const { default: mongoose } = require("mongoose");
const collection = require("../models/pollModel");
const routerPoll = require('express').Router();
const jwt = require('jsonwebtoken');
const e = require("express");
const checkLogin = require("../middlewares/checkLogin");

const Poll = mongoose.model("Poll");
const User = mongoose.model("Demo");



//posting data in mongodb
routerPoll.post("/add_poll", checkLogin, async(req,res, next) => {
    console.log(req.body.voter)
    console.log(req.body.title)
    console.log(req.body.startTime)
    console.log(req.body.endTime)
    console.log(req.body.question)
    console.log(req.body.options)
    console.log(req.id);
  try{
    const poll = await Poll.create({
        title: req.body.title,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        voter: req.body.voter,
        question: req.body.question,
        options: req.body.options,
    });
    
    await User.updateOne({
      _id: req.id
      
    }, {
      $push: {
        polls: poll._id
      }
    });

    const { id, title, startTime, endTime, voter, question, options} = poll;

    //return res.status(201).json({poll.title});

    return res.status(201).json({
        id, voter
    });
  }catch (err) {
    return next({
      status: 400,
      message: err.message,
    })
  }
});






module.exports = routerPoll

