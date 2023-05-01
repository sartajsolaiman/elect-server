const { default: mongoose } = require("mongoose");
const collection = require("../models/pollModel");
const routerPoll = require('express').Router();
const jwt = require('jsonwebtoken');
const e = require("express");
const checkLogin = require("../middlewares/checkLogin");
const crypto = require('crypto');

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
    const user = await User.findOne({
      _id: req.id
    });
    if (!user.confirmed) {
      throw new Error('Please confirm your email to login');
    }
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
          polls: {
            $each: [poll._id],
            $position: 0
          }
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

routerPoll.put("/addVote/:electId/:voterId/:option", async(req,res, next) =>{
  
  // console.log(req.params.electId)
  // console.log(req.params.option)
  try{
    
    const temp = await Poll.findOne({ _id: req.params.electId});
    if((temp.endTime - Date.now()) > 0){
      const poll = await Poll.findOne({ "_id": req.params.electId, 'voter.voterid': req.params.voterId }, { 'voter.$': 1 })
      console.log("kuk")
      console.log(poll.voter[0].voted)
      if(!poll.voter[0].voted){
        console.log("kuk")
        await Poll.updateOne({
          "_id": req.params.electId,
          "options.option": req.params.option     
        }, {
          $inc: {
              "options.$.votes": 1
          },
          
        });
    
        await Poll.updateOne({
          "_id": req.params.electId,
          "voter.voterid": req.params.voterId     
        }, 
          {
              "voter.$.voted": true
          });
      }else {
        console.log("kuk")
        return res.json({
          status: "voted"
        });
      }
      
    }else {
      return res.json({
        status: "finished"
      });
    }
   
  }catch(err){
    return next({
      status: 400,
      message: err.message,
    })
  }
});

routerPoll.get("/result/:electId", checkLogin, async(req,res, next) =>{
  
  // console.log(req.params.electId)
  // console.log(req.params.option)
  try{
    
    const poll = await Poll.findOne({ _id: req.params.electId});
    const {endTime, options} = poll;
    console.log(options)
    if((endTime - Date.now()) > 0){
      return res.json({
        status: "notok"
      })
    }else {
      return res.json({
        status: "ok",
        options
      })
    }
   
  }catch(err){
    return next({
      status: 400,
      message: err.message,
    })
  }
});

routerPoll.get("/generate", async(req,res, next) =>{
  
  // console.log(req.params.electId)
  // console.log(req.params.option)
  const id = crypto.randomBytes(Math.ceil(8/2)).toString('hex').slice(0, 8);
  return res.json({
    id: id
  })
});






module.exports = routerPoll

