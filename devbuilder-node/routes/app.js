const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
   const env = process.env.NODE_ENV || 'none';
   const uri = process.env.MONGODB_URI || 'none';
   const port = process.env.PORT || 'none';
   res.status(200).json({
      message: 'Success',
      env: env,
      uri: uri,
      port: port
   });
});

module.exports = router;