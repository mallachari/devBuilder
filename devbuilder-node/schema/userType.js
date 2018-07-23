const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList
} = graphql;
const OrderType = require('./orderType');
const User = require('../models/user');

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    orders: { 
      type: new GraphQLList(OrderType),
      resolve(parentValue) {
        return User.findById(parentValue.id)
          .populate('orders')
          .then(user => user.orders);
      }
    }
  })
})

module.exports = UserType;