const mongoose = require('mongoose');
const mongooseHidden = require('mongoose-hidden')();
const { Schema } = mongoose;
const { ObjectId } = require('mongodb');
const User = require('./user');

const Order = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String },
  description: { type: String },
  skills: [{
    type: Schema.Types.ObjectId,
    ref: 'Skill'
  }]
  // skills: [{ 
  //   type: { type: Schema.Types.ObjectId, ref: 'SkillType', required: true },
  //   description: { type: String },
  //   value: { type: Number, required: true }
  //  }]
});

Order.post('save', order => {
  User.findById(order.user)
    .then(user => {
      user.orders.push(order);
      user.save();
    })
});

Order.statics.removeOrder = function(id) {
  return this.findById(id)
    .then(order => {
      order.remove();
      return User.findById(order.user);
    })
    .then(user => {
      user.orders = user.orders.filter(curr => curr != id);
      return user.save();
    })
}

Order.plugin(mongooseHidden, { hidden: { _id: false }});

module.exports = mongoose.model('Order', Order);