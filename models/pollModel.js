const mongoose = require("mongoose");
//const bcrypt = require('bcryptjs');
const optionSchema = new mongoose.Schema({
    option: String,
    votes: {
        type: Number,
        default: 0,
    },
});

const voterSchema = new mongoose.Schema({
    votermail: String,
    // voterid: String
});

const pollSchema = mongoose.Schema({
    title: {type: String , required: true},
    startTime: {type: Date, required: true},
    endTime: {type: Date , required: true},
    voter: [voterSchema],
    question: {type: String, required: true},
    options: [optionSchema],
},


  
//   const pollSchema = new mongoose.Schema({
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//     },
//     created: {
//       type: Date,
//       default: Date.now,
//     },
//     question: String,
//     options: [optionSchema],
//     voted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//   });
{
    collection: "Poll"
});




//save in collection
mongoose.model("Poll",pollSchema)

//module.exports = mongoose.model("User", userSchema);