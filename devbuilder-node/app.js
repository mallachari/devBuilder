require('./config/config');

const express = require('express');
const expressGraphQL = require('express-graphql');
var helmet = require('helmet');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const mongoose = require('mongoose');

const appRoutes = require('./routes/app');
const authRoutes = require('./routes/auth');
const skillRoutes = require('./routes/skill');
const orderRoutes = require('./routes/order');
const schema = require('./schema/schema');

const app = express();
const port = process.env.PORT;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(helmet());   //Adds security headers

app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
   res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, PUT, DELETE, OPTIONS');
   next();
});

app.use('/auth', authRoutes);
app.use('/skill', skillRoutes);
app.use('/order', orderRoutes);
app.use('/', appRoutes);

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}))

app.use((req, res, next) => {
   res.status(404).json({
      message:'Resource not found',

   });
})

const server = http.createServer(app);
server.listen(port);

module.exports = app;