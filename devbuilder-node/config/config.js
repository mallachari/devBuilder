var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/devbuilder';
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/devbuilderTest';
} else if (env === 'prod') {
   process.env.MONGODB_URI = 'mongodb://burrito:!QAZxsw2@ds235388.mlab.com:35388/devbuilder';
}
