const { default: mongoose } = require("mongoose");
const collection = require("../models/pollModel");
const routerVote = require('express').Router();
const jwt = require('jsonwebtoken');
const e = require("express");
const checkLogin = require("../middlewares/checkLogin");
const moment = require('moment');

const Poll = mongoose.model("Poll");

routerVote.post("/login", async(req,res, next) => {
    try {
      // const id = new mongoose.Types.ObjectId(req.body.voterId)
      //   const poll = await Poll.findOne({
      //     "_id": req.body.electId,
      //   }).exec();
      //   console.log(poll.voter[0]._id)
      //   console.log(id)
      //     const ans = poll.voter.find(ans => ans._id === id)
          // const ans = poll.voter.find({_id: req.body.voterId})

          // const ans = await Poll.findOne({
          //   voter: {
          //     $elemMatch: {
          //       _id: req.body.voterId
          //     }
          //   }
          // });

          const temp = await Poll.findOne({ _id: req.body.electId});
          console.log(moment(temp.startTime).format('lll'))
          console.log(moment().add(6, 'hours').format('lll'))
          const start = moment(temp.startTime, 'lll')
          const now =  moment(moment().add(6, 'hours'), 'lll')
          const time = start.diff(now, "hours")
          console.log(time)

          if((temp.startTime - moment().subtract(6, 'hours').format('lll'))<=0){
            if((temp.endTime - moment().subtract(6, 'hours').format('lll') > 0)){

              Poll.findOne({ "_id": req.body.electId, 'voter.voterid': req.body.voterId }, { 'voter.$': 1 })
              .then(poll => {
                console.log(poll.voter[0].voted);
                if(!poll.voter[0].voted){
                  return res.json({
                    status: "ok"
                  });
                }else {
                  return res.json({
                    status: "notok"
                  });
                }
              })
              .catch(err => {
                console.log(err);
                return res.json({
                  status: "wronginfo"
                });
              });
            }else {
              return res.json({
                status: "finished"
              });
            }
          }else {
            return res.json({
              status: "notstarted"
            });
          }
      } catch (err) {
        console.log(err);
        return next({ status: 400, message: 'Invalid E-mail/Password' });
      }
});


routerVote.get("/poll/:electId", async(req,res, next) =>  {
  console.log("hi")
  console.log(req.params.electId)
  try {
      const poll = await Poll.findOne({
        _id: req.params.electId
      });
      const {question, options} = poll

      res.status(200).json({
          question,
          options
      });
  } catch (err) {
      return next({
        status: 400,
        message: err.message,
      })
  }
});



module.exports = routerVote
