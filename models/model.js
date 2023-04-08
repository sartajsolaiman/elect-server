const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {type: String , required: true},
    password: {type: String , required: true},
    email: {type: String , required: true},
},
{
    collection: "Demo"
});

//save in collection
mongoose.model("Demo",userSchema)

//module.exports = mongoose.model("User", userSchema);