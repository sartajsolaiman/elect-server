const { default: mongoose } = require("mongoose");
const collection = require("../models/userModel");
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const e = require("express");
const checkLogin = require("../middlewares/checkLogin");
const nodemailer = require("nodemailer");
const cors = require('cors');

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

       
        const token = jwt.sign(
          { id, email },
           process.env.SECRET,
        );

        const url = `https://plum-curious-katydid.cyclic.app/api/auth/confirmation/${token}`;

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
              user: 'elect.me5160@gmail.com',
              pass: 'ojwubdbphslrbnsr'
          }
      });

        await transporter.sendMail({
          from: 'ElectMe<elect.me5160@gmail.com>',
          to: email,
          subject: 'Confirm Email',
          html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
        });

      return res.status(201).json({
        id,
        email,
        token
      });
  }catch (err) {
    if (err.code === 11000) {
      err.message = 'Sorry, that email is already taken';
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
    const { id, email, confirmed } = user;
    console.log(confirmed)
    
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
    return next({ status: 400, message: 'Invalid E-mail/Password' });
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

router.get("/polls", checkLogin, cors(), async(req,res, next) =>  {
  console.log("first")
  try {
      const users = await User.findOne({
        _id: req.id
      }).populate("polls");
      const {polls} = users

      res.status(200).json({
          polls
      });
  } catch (err) {
      return next({
        status: 400,
        message: err.message,
      })
  }
});

router.get('/confirmation/:token', async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.SECRET);
    const { id } = decoded;
    await User.updateOne({_id: id},{ confirmed: true });
    return res.status(200).json({
      confirmation: 'ok'
    })
  } catch (e) {
    res.send('error');
  }
});

module.exports = router
