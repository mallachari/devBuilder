const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const errorCodes = require('../errors/errorCodes').mongoCodes;

const EXPIRATION_TIME = 7200;

// router.post('/', (req, res, next) => {
//    res.status(200).json({
//       message: 'ok'
//    })
// });

router.post('/signup', (req, res, next) => {
   const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      email: req.body.email
   });

   user.save()
      .then(result => {
         res.status(201).json(result);
      })
      .catch(err => {
         res.status(500).json({
            message: 'An error occured',
            error: errorCodes[err.code] || err
         });
      });
});

router.post('/signin', (req, res, next) => {
   User.findOne({email: req.body.email})
      .then(user => {
         if(!user) {
            return res.status(401).json({
               message: 'Login failed',
               error: 'Invalid login credentials'
            }); 
         }
         if(!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
               message: 'Login failed',
               error: 'Invalid login credentials'
            }); 
         }
         const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: EXPIRATION_TIME });
         res.status(200).json({
            message: 'Succesfully logged in',
            token: token,
            userId: user._id,
            expiresIn: EXPIRATION_TIME
         });

      })
      .catch((err => {
         res.status(500).json({
            message: 'An error occured',
            error: err
         });
      }));
});

module.exports = router;