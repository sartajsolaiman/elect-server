
const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {

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
    to: "rizwanhrizvi@gmail.com, noobcoder679@gmail.com", // list of receivers
    subject: "Hello Thapa", // Subject line
    text: "Hello YT Thapa", // plain text body
    html: "<b>Hello YT Thapa</b>", // html body
  });

  transporter.sendMail((err) =>{
    if(err) console.log("error occured")
    else console.log("email sent")
})

  console.log("Message sent: %s", info.messageId);
  res.json(info);
};



module.exports = sendMail;