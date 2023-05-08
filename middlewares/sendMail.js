
const { response } = require("express");
const nodemailer = require("nodemailer");
const { default: mongoose } = require("mongoose");
const collection = require("../models/pollModel");
const Poll = mongoose.model("Poll");
const router = require('express').Router();

const sendMail = async (req, res) => {
    let vmail = []
    const eid = req.query.eid
    const vid = req.query.vid
    vmail = [req.query.vmail]
    // router.post("/login", async(req,res, next)  => {
    //     try {
    //       const poll = await Poll.findOne({
    //         _id: req.query.eid,
    //       });
    //     //   const { id, email } = user;
    //     //   const valid = await user.comparePassword(req.body.password);
      
    //     //   if (valid) {
    //     //     const token = jwt.sign({ id, email }, process.env.SECRET);
    //     //     return res.status(200).json({
    //     //       id,
    //     //       email,
    //     //       token,
    //         //});
    //     //   } else {
    //     //     throw new Error();
    //     //   }
    //     const { id, title, startTime, endTime, voter, question, options} = poll;

    //     console.log(id)

        
        
    //   //   voterEmail.push(voter[0].votermail);

    //   // console.log(voterEmail.map(item => item))
    //     } catch (err) {
    //       console.log(err);
    //      // return next({ status: 400, message: 'Invalid Username/Password' });
    //     }
    //   });

      

    //    voter.map(entity => {
          
    //    })

  // connect with the smtp
  const transporter = nodemailer.createTransport({
      // service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS
      },
      timeout: 120000
  });

  await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
            reject(error);
        } else {
            console.log("Server is ready to take our messages");
            resolve(success);
        }
    });
});

const mailData = {
    from: 'ElectMe<elect.me5160@gmail.com>', // sender address
    to: vmail, // list of receivers
    subject: "Elect Me voter info", // Subject line
    text: "Election ID: "+eid+" \n Voter ID: "+vid, // plain text body
    // html: "<b>Election ID: ${id}</b>", // html body
}

await new Promise((resolve, reject) => {
  // send mail
  transporter.sendMail(mailData, (err, info) => {
      if (err) {
          console.error(err);
          reject(err);
      } else {
          console.log(info);
          resolve(info);
      }
  });
});

res.status(200).json({ status: "OK" });
};
  
// const sendMessage = async() => {
//   try{
//     await transporter.sendMail({
//       from: 'ElectMe<elect.me5160@gmail.com>', // sender address
//       to: vmail, // list of receivers
//       subject: "Elect Me voter info", // Subject line
//       text: "Election ID: "+eid+" \n Voter ID: "+vid, // plain text body
//       // html: "<b>Election ID: ${id}</b>", // html body
      
//     });
//     console.log(info.to)
//   }catch(err){
//     console.log(err)
//   }
// }
  

//   transporter.sendMail((err) =>{
//     if(err) console.log("error occured")
//     else console.log("email sent")
// })
// };



module.exports = sendMail;