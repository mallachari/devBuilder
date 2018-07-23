const express = require('express');
const router = express.Router();

const authenticate = require('../middleware/authenticate');
const Order = require('../models/order');
const SkillType = require('../models/skillType');
const Skill = require('../models/skill');
const Error = require('../errors/errorMessage');

router.get('/', authenticate, (req, res) => {
  const user = req.user;
  if(!user) {
    res.status(500).json({
      message: 'An error occured',
      error: 'No user found'
   });
  }
  Order.find({})
    //.populate('skills')
    .populate({ path: 'skills', populate: { path: 'type' }})
    .populate('user', 'firstName lastName email')
    .then(orders => {
      res.json(orders);
    })
    .catch(error => {
      res.status(500).json(new Error('An error occured', error.message));
    });
});

router.post('/', authenticate, (req, res) => {
  const user = req.user;
  if(!user) {
    return res.status(500).json(new Error('An error occured', 'No user found'));
  }
  const skills = req.body.skills;
  if(!skills) {
    return res.status(400).json(new Error('Bad request', 'Skills required'));
  }

  const order = new Order({
    user,
    skills: []
  });

  const skillTypeQueries = [];
  const skillQueries = [];
  for(let skill of skills) {
    skillTypeQueries.push(SkillType.findByName(skill.type));
  }
  Promise.all(skillTypeQueries)
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
    .then(order => {
      return res.status(201).json(order);
    })
    .catch(error => {
      console.log('kle error',error);
      res.status(500).json(new Error('An error occured', error))
    })

});

router.delete('/:id', authenticate, (req, res) => {
  const user = req.user;
  const id = req.params.id;
  Order.removeOrder(id)
    .then(() => {
      res.status(204).send();
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(new Error('An error occured', error));
    })
});

module.exports = router;