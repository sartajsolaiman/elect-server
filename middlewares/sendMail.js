
const { response } = require("express");
const nodemailer = require("nodemailer");
const { default: mongoose } = require("mongoose");
const collection = require("../models/pollModel");
const Poll = mongoose.model("Poll");
const router = require('express').Router();

const sendMail = async (req, res) => {
    const voterEmail = []
    //router.post("/login", async(req,res, next)  => {
        try {
          const poll = await Poll.findOne({
            _id: req.query.id,
          });
        //   const { id, email } = user;
        //   const valid = await user.comparePassword(req.body.password);
      
        //   if (valid) {
        //     const token = jwt.sign({ id, email }, process.env.SECRET);
        //     return res.status(200).json({
        //       id,
        //       email,
        //       token,
            //});
        //   } else {
        //     throw new Error();
        //   }
        const { id, title, startTime, endTime, voter, question, options} = poll;

        

        voterEmail.push(voter[0].votermail);

      console.log(voterEmail.map(item => item))
        } catch (err) {
          console.log(err);
         // return next({ status: 400, message: 'Invalid Username/Password' });
        }
      //});

      

    

  // connect with the smtp
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

  let info = await transporter.sendMail({
    from: '<rizwanulhaquerizvi@gmail.com>', // sender address
    to: voterEmail, // list of receivers
    subject: "Hello Thapa", // Subject line
    text: "Hello YT Thapa", // plain text body
    html: "<b>Hello YT Thapa</b>", // html body
  });

  transporter.sendMail((err) =>{
    if(err) console.log("error occured")
    else console.log("email sent")
})

//   console.log("Message sent: %s", info.messageId);
//   res.json(info);
};



module.exports = sendMail;