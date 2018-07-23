const mongoose = require('mongoose');
const mongooseHidden = require('mongoose-hidden')();
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const User = new Schema({
   firstName: {type: String, required: true},
   lastName: {type: String, required: true},
   password: {type: String, required: true},
   email: {type: String, required: true, unique: true},
   orders: [{
     type: Schema.Types.ObjectId,
     ref: 'Order'
   }]
});

User.pre('save', function(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});

User.plugin(mongooseHidden, { hidden: { _id: false }});

module.exports = mongoose.model('User', User);