const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const OrderType = require('./orderType');
const SkillTypesType = require('./skillTypesType');
const UserType = require('./userType');
const User = require('../models/user');
const SkillType = require('../models/skillType');
const Order = require('../models/order');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      }
    },
    skillTypes: {
      type: new GraphQLList(SkillTypesType),
      resolve() {
        return SkillType.find({});
      }
    },
    orders: {
      type: new GraphQLList(OrderType),
      resolve() {
        return Order.find({})
      }
    }
  }
});

module.exports = RootQuery;