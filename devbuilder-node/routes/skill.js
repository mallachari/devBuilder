const express = require('express');
const router = express.Router();

const Skill = require('./../models/skill');
const SkillType = require('./../models/skillType');
const Order = require('./../models/order');
const authenticate = require('../middleware/authenticate');
const { reset } = require('../services/skillTypeService');

router.get('/', (req, res) => {
  SkillType.find({}).then(skills => {
    res.json(skills);
  })
  .catch((err => {
    res.status(500).json({
       message: 'An error occured',
       error: err
    });
 }));
});

router.post('/', (req, res) => {
  if(!req.body.name || !req.body.fullName) {
    return res.status(400).json({
      message: 'Bad request',
      error: 'Missing content'
    });
  } 
  const skill = new SkillType({
    name: req.body.name,
    fullName: req.body.fullName
  });

  skill.save()
    .then(result => {
      res.status(201).json(result)
    })
    .catch(err => {
      res.status(500).json({
         message: 'An error occured',
         error: err
      });
   });
});

router.delete('/:name', (req, res) => {
  const name = req.params.name;
  SkillType.findOneAndRemove({ name })
    .then(skill => {
      if(!skill) {
        return res.status(404).json({
          message: 'Bad request',
          error: 'Skill not found'
        })
      }
      return res.status(204).send();
    })
    .catch(err => {
      res.status(500).json({
         message: 'An error occured',
         error: err
      });
    });

});

//resets skills list
router.put('/', (req,res) => {
  reset();
  SkillType.find({})
    .then(skills => {
      return res.status(201).json(skills);
    })
})

module.exports = router;