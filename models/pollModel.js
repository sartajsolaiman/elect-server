const mongoose = require("mongoose");
//const bcrypt = require('bcryptjs');

const pollSchema = mongoose.Schema({
    title: {type: String , required: true},
    startTime: {type: Date, required: true},
    endTime: {type: Date , required: true},
    voterMail: {type: [String] , required: true},
    question: {type: String, required: true},
    options: {type: [String], required: true}
},
{
    collection: "Poll"
});


//save in collection
mongoose.model("Poll",pollSchema)

//module.exports = mongoose.model("User", userSchema);