const mongoose = require('mongoose');
const mongooseHidden = require('mongoose-hidden')();
const { Schema } = mongoose;

const Skill = new Schema({
  type: { type: Schema.Types.ObjectId, ref: 'SkillType', required: true },
  description: { type: String },
  value: { type: Number, required: true },
  order: { type: Schema.Types.ObjectId, ref: 'Order', required: true }
});

Skill.plugin(mongooseHidden, { hidden: { _id: false }});

module.exports = mongoose.model('Skill', Skill);