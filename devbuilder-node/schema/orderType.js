const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = graphql;
const Order = require('../models/order');
const SkillType = require('./skillType');

const OrderType = new GraphQLObjectType({
  name: 'OrderType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    user: {
      type: require('./userType'),
      resolve(parentValue) {
        return Order.findById(parentValue).populate('user')
          .then(order => order.user);
      }
    },
    skills: { 
      type: new GraphQLList(SkillType),
      resolve(parentValue) {
        return Order.findById(parentValue)
          .populate('skills')
          .then(order => order.skills)
      } 
    }
  })
});

module.exports = OrderType;