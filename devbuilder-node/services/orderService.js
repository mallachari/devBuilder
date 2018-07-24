const Order = require('../models/order');
const SkillType = require('../models/skillType');
const Skill = require('../models/skill');

const getOrders = () => {
  return Order.find({})
    .populate({ path: 'skills', populate: { path: 'type' }})
    .populate('user', 'firstName lastName email')
}

const addOrder = (user, skills) => {
  const order = new Order({
    user,
    skills: []
  });

  const skillTypeQueries = [];
  const skillQueries = [];
  for(let skill of skills) {
    skillTypeQueries.push(SkillType.findByName(skill.type));
  }
  return Promise.all(skillTypeQueries)
    .then(skillTypes => {
      for(let i=0; i< skills.length; i++) {
        skills[i].type = skillTypes[i];
        skills[i].order = order._id;
        const skill = new Skill(skills[i]);
        order.skills.push(skill);
        skillQueries.push(skill.save());
      }
      return Promise.all(skillQueries)
    })
    .then(skills => {
      return order.save();
    })
}

const deleteOrder = (id) => {
  return Order.removeOrder(id);
}

module.exports = {
  getOrders,
  addOrder,
  deleteOrder
}