const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: {type: String , required: true},
    lastName: {type: String , required: true},
    password: {type: String , required: true},
    email: {type: String , required: true},
},
{
    collection: "Demo"
});

//save in collection
const model =  mongoose.model("Demo",userSchema);

module.exports = model;
