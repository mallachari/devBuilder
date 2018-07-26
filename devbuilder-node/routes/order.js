const express = require('express');
const router = express.Router();

const OrderService = require('../services/orderService');

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
  OrderService.getOrders()
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
  const title = req.body.title;
  const description = req.body.description;

  OrderService.addOrder(user, skills, title, description)
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
  OrderService.deleteOrder(id)
    .then(() => {
      res.status(204).send();
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(new Error('An error occured', error));
    })
});

module.exports = router;