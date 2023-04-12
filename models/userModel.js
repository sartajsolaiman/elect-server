const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    firstname: {type: String , required: true},
    firstname: {type: String , required: true},
    email: {type: String , required: true},
    password: {type: String , required: true},
    confirmed: {type: Boolean, default: false}
},
{
    collection: "Demo"
});

userSchema.pre('save', async function(next) {
    try {
      if (!this.isModified('password')) {
        return next();
      }
      const hashed = await bcrypt.hash(this.password, 10);
      this.password = hashed;
      return next();
    } catch (err) {
      return next(err);
    }
  });
  
  userSchema.methods.comparePassword = async function(attempt, next) {
    try {
      return await bcrypt.compare(attempt, this.password);
    } catch (err) {
      return next(err);
    }
  };

//save in collection
mongoose.model("Demo",userSchema)

//module.exports = mongoose.model("User", userSchema);