const mongoose = require('mongoose');
const mongooseHidden = require('mongoose-hidden')();
const { Schema } = mongoose;

const SkillType = new Schema({
  name: { type: String, required: true },
  fullName: { type: String, required: true }
});

SkillType.statics.findByName = function(name) {
  return this.findOne({ name: name });
}

SkillType.plugin(mongooseHidden, { hidden: { _id: false }});

module.exports = mongoose.model('SkillType', SkillType);